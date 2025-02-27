import { ref } from "vue"

export const usePhotoPreview = (initialPhoto = null) => {
    const previewPhoto = ref(initialPhoto);

    const handlePhotoPreview = (e) => {
        if (!e.target.files.length) {
            console.warn('Empty file input');
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = (e) => {
            previewPhoto.value = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return {
        handlePhotoPreview,
        previewPhoto
    }
}