<script setup>
import ProjectForm from '@/components/ProjectForm.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const projectStore = useProjectStore();
const handleSubmit = async (values) => {
   const success = await projectStore.storeProject(values);
   if (success) {
    router.push({name: 'projects.index'});
   }
}
</script>
<template>
     <div class="mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Create New Project</h1>
            <p class="mt-2 text-gray-600">Fill in the project details to get started.</p>
        </div>
        <ProjectForm @form-submit="handleSubmit" :laoding="projectStore.loading"/>
    </div>
</template>