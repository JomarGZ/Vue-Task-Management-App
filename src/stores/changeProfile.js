import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useAuth } from "./auth";
import { useSweetAlert } from "@/composables/useSweetAlert2";

export const useChangeProfile = defineStore("change-profile", () => {
    const {fetchAuthUser} = useAuth();
    const { showToast } = useSweetAlert();
    const isUpdateProfileLoading = ref(false);
    const isUpdateProfileError = ref(false);
    const errors = reactive({});
    const form = reactive({
        name: '',
        email: ''
    });

    const isEmptyFields = computed(() => form.name.trim() === '' && form.email.trim() === '');
    const resetForm = () => {
        form.name = '';
        form.email = '';

        errors.value = {};
    }

    const handleUpdateProfile = async () => {
        await handleAsyncRequestOperation(updateProfile,() => {
            showToast('Profile updated successfully.');
            fetchAuthUser();
            resetForm();
        }, isUpdateProfileLoading, isUpdateProfileError, (error) => {
            if (error.response.status === 422) {
                errors.value = error.response?.data?.errors
            } else {
                showToast('Profile update failed.', 'error');
            }
        });
    }
    const updateProfile = async () => {
        return window.axios.post("api/v1/user/profile-update", form);
    }

    return {
        form,
        errors,
        isUpdateProfileLoading,
        isUpdateProfileError,
        isEmptyFields,
        resetForm,
        handleUpdateProfile,
    }
});