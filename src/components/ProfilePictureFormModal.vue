<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import DefaultUserPic from './DefaultUserPic.vue';
import Modal from './Modal.vue';
import { onBeforeUnmount, ref } from 'vue';
import { usePhotoPreview } from '@/composables/usePhotoPreview';
import { useChangeUserAvatar } from '@/stores/changeUserAvatar';
const auth = useAuth();
const changeAvatar = useChangeUserAvatar();
const emit = defineEmits(['close-modal']);
const {previewPhoto, handlePhotoPreview} = usePhotoPreview(auth.avatar?.['thumb-200']);
const uploadAvatarPrview = (event) => {
    const file = event.target?.files[0];
    handlePhotoPreview(event);
    changeAvatar.form.avatar = file;
}
const handleSubmit = async () => {
    const success = await changeAvatar.handleChangeAvatar();
    if (success) {
        emit('close-modal');
    }
}
onBeforeUnmount(() => changeAvatar.resetForm());
</script>
<template>
    <teleport to="body">
        <Modal>
            <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <!-- Modal Header -->
                    <div class="border-b px-6 py-4 flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">Update Profile Picture</h3>
                        <button @click="$emit('close-modal')" class="text-gray-400 hover:text-gray-500">
                            <IconSVG name="x-svg" class="h-6 w-6"/>
                        </button>
                    </div>
                    <!-- Modal Body -->
                    <div class="px-6 py-4">
                        <!-- Current Profile Picture -->
                        <div class="flex flex-col items-center mb-6">
                            <img v-if="previewPhoto" :src="previewPhoto" alt="Current profile" class="h-32 w-32 md:h-52 md:w-52 rounded-full object-cover border-4 border-white outline outline-2 outline-blue-500 mb-2" />
                            <DefaultUserPic v-else :name="auth.userName" class="h-32 w-32 md:h-52 md:w-52 text-6xl border-4"/>
                            <p class="text-sm text-gray-500">Current Photo</p>
                        </div>
                        
                        <!-- File Upload Form -->
                        <form @submit.prevent="handleSubmit">
                        <!-- Drag & Drop Area -->
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors duration-300 mb-4">
                                <svg class="mx-auto h-6 w-6 md:h-12 md:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="mt-2 text-sm text-gray-600">
                                <label for="file-upload" class="cursor-pointer font-medium text-blue-500 hover:text-blue-600">
                                    Click to upload
                                </label>
                                    or drag and drop
                                </p>
                                <p class="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                <input id="file-upload" name="file-upload" type="file" @change="uploadAvatarPrview" class="sr-only" accept="image/*">
                                <ValidationError :errors="changeAvatar.errors" field="avatar"/>
                            </div>
                            
                            <!-- Guidelines -->
                            <div class="text-xs text-gray-500 mb-6">
                                <p class="mb-1">• Square images work best</p>
                                <p class="mb-1">• Minimum recommended size: 400x400 pixels</p>
                                <p>• For best results, upload a clear photo of your face</p>
                            </div>
                            <div class="flex justify-center md:justify-end px-3 py-2 md:px-6 md:py-4 space-x-2 md:space-x-3">
                        <button @click="$emit('close-modal')" class="py-1 px-2 md:py-2 md:px-4 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300">
                            Cancel
                        </button>
                        <button
                          :disabled="changeAvatar.isActionDisabled"
                          :class="[
                                'py-1 px-3 md:py-2 md:px-5 border border-transparent rounded-md shadow-sm text-xs md:text-sm font-medium text-white transition-colors duration-300',
                                changeAvatar.isActionDisabled ? 'bg-blue-400' : 'bg-blue-500  hover:bg-blue-600'
                          ]">
                            <IconSpinner v-if="changeAvatar.isStoreAvatarLoading" name="white-spinner" class="h-3 w-3 md:h-5 md:w-5"/>
                            <span v-else>Save Changes</span>
                        </button>
                    </div>
                        </form>
                    </div>
                    <!-- Modal Footer -->
                   
                </div>
            </div>
        </Modal>
    </teleport>
</template>