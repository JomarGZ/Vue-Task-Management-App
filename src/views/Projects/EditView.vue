<script setup>
import ProjectForm from '@/components/ProjectForm.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();
const handleSubmit = async (values) => {
   const success = await projectStore.updateProject(route.params.projectId, values);
   if (success) {
    router.push({name: 'projects.index'});
   }
}
onMounted(() => projectStore.getProject(route.params?.projectId))
</script>
<template>
     <div class="mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Edit Project</h1>
            <p class="mt-2 text-gray-600">Fill in the project details to get started.</p>
        </div>
        <ProjectForm v-if="!projectStore.isLoading" @form-submit="handleSubmit" :isEditMode="true" :laoding="projectStore.loading" :project="projectStore.project"/>
    </div>
</template>