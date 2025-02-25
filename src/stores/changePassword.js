import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { useSweetAlert } from "@/composables/useSweetAlert2";
 
export const useChangePassword = defineStore("change-password", () => {
  const { showToast } = useSweetAlert();
  const errors = reactive({});
  const status = ref("");
  const isUpdatePasswordloading = ref(false);
  const isUpdatePasswordError = ref(false);
  const form = reactive({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
 
  function resetForm() {
    form.current_password = "";
    form.password = "";
    form.password_confirmation = "";
 
    errors.value = {};
    status.value = "";
  }
 
  const handleUpdatePassword = async () => {
    await handleAsyncRequestOperation(updatePassword, () => {
      showToast('Password successfully updated');
      resetForm();
    }, isUpdatePasswordloading, isUpdatePasswordError, (error) => errors.value = error.response?.data?.errors);
  }
  const updatePassword = async () => {
    return window.axios.put("api/v1/auth/password-update", form);
  }
 
  return {
    form,
    isUpdatePasswordloading,
    isUpdatePasswordError,
    errors,
    status,
    resetForm,
    handleUpdatePassword,
    updatePassword,
  };
});