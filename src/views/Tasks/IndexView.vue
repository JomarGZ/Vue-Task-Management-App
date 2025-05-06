<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { useTaskStore } from "@/stores/taskStore";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import TaskFilter from '@/components/TaskFilter.vue';
import { useRoute } from "vue-router";
const taskStore = useTaskStore();

const route = useRoute();

onMounted(async () => {
   const filters = ref({});
    const queryFiltersMap = [
        {query: 'search', filter: 'search'},
        {query: 'status', filter: 'status'},
        {query: 'priority', filter: 'priority'},
        {query: 'assigneeId', filter: 'assigneeId'},
    ];
    queryFiltersMap.forEach(({query, filter}) => {
        const value = route.query[query]?.trim();
        if (value && value.length > 0) {
            filters.value[filter] = value
        }
    })
    await Promise.all([
        taskStore.getTasks(1, filters.value),
    ]);
});
const handleFilters = async (filters) => {
    await taskStore.getTasks(1, filters);
}

onBeforeUnmount(() => taskStore.resetFilters());
</script>
<template>
    <div class="">
        <page-header class="mb-7">Tasks</page-header>
        <TaskFilter @submit-filters="handleFilters" class="mb-7"/>
        <div>
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="taskStore?.loading" class="text-center">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <IconSpinner class="h-10 w-10 text-gray-500 opacity-30" name="custom-spinner" />
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="taskStore?.isError" class="text-center">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>Failed to load tasks</p>
                            </div>
                        </td>
                    </tr>
                    <template v-else-if="taskStore.tasks.data?.length > 0">
                        <tr 
                           v-for="task in taskStore.tasks.data"
                            :key="task.id"
                        >
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-mobile-alt text-purple-600"></i>
                                    </div>
                                    <div class="ml-4 min-w-0">
                                        <div class="text-sm font-medium text-gray-900 truncate max-w-[180px]">{{ task?.title }}</div>
                                        <div class="text-sm text-gray-500">Client: asignees</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    {{ task?.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs capitalize leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    {{ task?.priority_level }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm flex items-center font-medium space-x-2">
                                <RouterLink :to="{name: 'tasks.show', params: { projectId: task.project?.id, taskId: task.id }}"  class="text-green-600 hover:text-green-900" title="View project">
                                    <IconSVG name="eye-svg"/>
                                </RouterLink>
                            </td>
                        </tr>
                    </template>
                    <tr v-else >
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>No task found</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex items-center justify-center mt-4">
                <TailwindPagination
                    :data="taskStore.tasks"
                    @pagination-change-page="taskStore.getTasks"
                />
            </div>
        </div>
    </div>
</template>