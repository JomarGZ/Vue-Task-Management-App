import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAuth } from "./auth";
import { useSweetAlert } from "@/composables/useSweetAlert2";
import { AxiosError } from "axios";

export const useChangeProfile = defineStore("change-profile", () => {
    const { showToast } = useSweetAlert();
    const isUpdateProfileLoading = ref(false);
    const isUpdateProfileError = ref(false);
    const errors = reactive({});

    const auth = useAuth();
    const updateProfile = async (values) => {
        if (!values) return;
        try {
            const response = await window.axios.post("api/v1/user/profile-update", values);
            auth.fetchAuthUser();
            showToast("Profile Updated successfully");
            return true
        } catch(e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                return {
                    errors: e.response.data.errors || {},
                    status: e.response.status,
                };
            } else {
                showToast("Profile Updated failed", 'error');
            }
            throw e;
        }
    }

    return {
        errors,
        updateProfile,
        isUpdateProfileLoading,
        isUpdateProfileError,
    }
});