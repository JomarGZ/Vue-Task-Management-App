<script setup>
import { capWords } from '@/composables/useUtil';
import { useProjectStore } from '@/stores/projectStore';
import { onMounted, watch } from 'vue';
import ProjectItem from '@/components/ProjectItem.vue';
const store = useProjectStore();
const handleFilterProjects = async ([status, priority]) => {
    store.filterProjects({status: status, priority: priority})
}
watch(
  () => store.searchInput,
  (newSearch) => {
    store.debounceSearch(newSearch)
  },
)
watch(() => [store.selectedStatus, store.selectedPriority], handleFilterProjects)
    
onMounted(async() => {
    await Promise.all([
        store.getProjects(),
        store.getStatuses(),
        store.getPriorityLevels()
    ]);
})
const handleProjectDelete = async (projectId) => {
    const success = await store.deleteProject(projectId);
    if (success) {
        await store.getProjects();
    }
}
</script>
<template>
     <div class="max-w-7xl mx-auto bg-gray-50 p-4 rounded-2xl">
        <!-- Header with Create Button -->
        <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-800">Projects Management</h1>
            <RouterLink :to="{ name: 'projects.create'}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                <IconSVG name="plus-svg"/>
                Create Project
            </RouterLink>
        </div>
        <!-- Search and Filter Section -->
        <div class="mb-6 flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
                <div class="relative">
                    <input v-model="store.searchInput" type="text" placeholder="Search projects..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <div class="absolute left-3 top-2.5 text-gray-400">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            </div>
            <select v-model="store.selectedStatus" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Status</option>
                <option v-for="(status, index) in store.projectStatuses" :key="index" :value="status">{{ capWords(status) }}</option>
            </select>
            <select v-model="store.selectedPriority" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Priority</option>
                <option v-for="(priority, index) in store.projectPriorityLevels" :key="index" :value="priority">{{ capWords(priority) }}</option>
            </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th @click="store.orderBy('name')" class="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="store.isFetchingProjects" class="text-center">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <IconSpinner class="h-10 w-10 text-gray-500 opacity-30" name="custom-spinner" />
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="store.hasFetchProjectsError" class="text-center">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>Failed to load projects</p>
                            </div>
                        </td>
                    </tr>
                    <template v-else-if="store.projects?.length > 0">
                       <ProjectItem
                            v-for="project in store.projects"
                            :key="project.id"
                            :name="project.name"
                            :client_name="project.client_name"
                            :status="project.status"
                            :priority="project.priority"
                            :id="project.id"
                            :assignees="project.assigned_members"
                            @delete-project="handleProjectDelete"
                       />
                    </template>
                    <tr v-else >
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>No project found</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination -->
        <PaginationComponent :pagination="store.pagination" :onPageChange="store.changePage"/>
    </div>
</template>