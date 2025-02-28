import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useAuth } from "./auth";
import { useSweetAlert } from "@/composables/useSweetAlert2";

export const useChangeUserAvatar = defineStore('change-user-avatar', () => {
    const {fetchAuthUser} = useAuth();
    const {showToast} = useSweetAlert();
    const isStoreAvatarLoading = ref(false);
    const isStoreAvatarError = ref(false);
    const errors = reactive({});
    const form = reactive({
        avatar: null
    });

    const resetForm = () => {
        form.avatar = null;
        errors.value = {};
    }

    const isActionDisabled = computed(() => isStoreAvatarLoading.value || form.avatar === null);
    const handleErrors = (error) => {
        if (error.reponse?.status === 422) {
            errors.value = error.reponse?.data?.errors;
        } else {
            showToast('Profile picture update failed', 'error');
        }
    }

    const handleChangeAvatar = async () => {
        try {
            await handleAsyncRequestOperation(
              changeAvatar, 
              () => {
                showToast('Profile picture is updated successfully');
                fetchAuthUser();
              }, 
              isStoreAvatarLoading, 
              isStoreAvatarError, 
              handleErrors
            );
            return true;
          } catch (error) {
            return false;
          }
    }
    const changeAvatar = async () => {
        const formData = new FormData();
        formData.append('avatar', form.avatar);
        return window.axios.post("api/v1/user/profile-avatar", formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });
    }
    return {
        handleChangeAvatar,
        resetForm,
        form,
        errors,
        isActionDisabled,
        isStoreAvatarLoading,
        isStoreAvatarError,
    }
});