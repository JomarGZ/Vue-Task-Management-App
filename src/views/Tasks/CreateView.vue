<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const projectTaskStore = useProjectTaskStore();
const handleSubmit = async (values) => {
    const success = await projectTaskStore.storeTask(route.params?.projectId, values);
    if (success) router.push({name: 'projects.show', params: {projectId: route.params?.projectId}});    
}
onMounted(async() => projectStore.getProject(route?.params?.projectId));
</script>
<template>
    <div class="mx-auto space-y-6">
        <div class="bg-white rounded-xl shadow-sm p-8 min-w-0">
            <h3 class="text-lg font-semibold text-gray-800 mb-6 truncate">Add New Task to {{ projectStore?.project?.name }}</h3>
            <TaskForm
                :projectId="$route.params.projectId"
                @submit="handleSubmit"
            />
        </div>
    </div>
</template>