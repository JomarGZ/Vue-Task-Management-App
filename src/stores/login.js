import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/stores/auth";
import { email, helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
 
export const useLogin = defineStore("login", () => {
  const auth = useAuth();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    email: "",
    password: "",
    remember: false,
  });
 
  const rules = computed(() => ({
      email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Please enter a valid email address.', email),
      },
      password: {
        required: helpers.withMessage('Password is required.', required),
      },
  }));

  const v$ = useVuelidate(rules, form);

  function resetForm() {
    form.email = "";
    form.password = "";
    form.remember = false;
    v$.value.$reset();
    errors.value = {};
  }
  const isActionDisabled = computed(() => loading.value || v$.value.$invalid);
  async function handleSubmit() {
    const isFormValidated = await v$.value.$validate();
    if (!isFormValidated) return;
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("api/v1/auth/login", form)
      .then((response) => {
        resetForm();
        auth.login(response.data.data.access_token);
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.password = "";
        loading.value = false;
      });
  }
 
  return { form, isActionDisabled, v$, errors, loading, resetForm, handleSubmit };
});