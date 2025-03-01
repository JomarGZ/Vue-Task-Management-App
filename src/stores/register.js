import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "./auth";
import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useSweetAlert } from "@/composables/useSweetAlert2";
export const useRegister = defineStore("register", () => {
  const auth = useAuth();
  const loading = ref(false);
  const {showToast} = useSweetAlert();
  const errors = reactive({});
  const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  
  const rules = computed(() => ({
    name: {
      required: helpers.withMessage('Name is required.', required),
      minLength: helpers.withMessage('Name must be at least 3 characters long.', minLength(3)),
    },
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage('Please enter a valid email address.', email),
    },
    password: {
      required: helpers.withMessage('Password is required.', required),
      minLength: helpers.withMessage('Password must be at least 8 characters long.', minLength(8)),
    },
    password_confirmation: {
      required: helpers.withMessage('Password confirmation is required.', required),
      sameAsPassword: helpers.withMessage('Passwords do not match.', sameAs(form.password)),
    },
  }));

const v$ = useVuelidate(rules, form);

  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
    v$.value.$reset(); 
    errors.value = {};
  }
 
  async function handleSubmit() {
    const isFormValidate = await v$.value.$validate();
    if (!isFormValidate) return;
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    return window.axios.post("api/v1/auth/register", form)
      .then((response) => {
        resetForm();
        showToast('Registered successfully');
        auth.login(response.data.data.access_token);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.password = "";
        form.password_confirmation = "";
        loading.value = false;
      });
  }
 
  return { 
    form,
    loading,
    errors,
    v$,
    resetForm, 
    handleSubmit
  };
});