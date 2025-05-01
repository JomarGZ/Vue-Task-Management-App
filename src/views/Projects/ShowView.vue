<script setup>
import AssignProjectTeamModal from '@/components/AssignProjectTeamModal.vue';
import CommentsSection from '@/components/CommentsSection.vue';
import DefaultUserPic from '@/components/DefaultUserPic.vue';
import { formatDateOnly, getInitials } from '@/composables/useFormatters';
import { capWords } from '@/composables/useUtil';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { useTaskStore } from '@/stores/taskStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const projectStore = useProjectStore();
const projectTaskStore = useProjectTaskStore();
const taskStore = useTaskStore();
const route = useRoute();
const isModalShow = ref(false);
watch(() => projectTaskStore.searchInput, projectTaskStore.debounceSearch);

const refetchProject = () => {
    projectStore.getProject({id: route?.params?.projectId})
}
const handleTaskFilterChange = ([selectedStatus, selectedPriority]) => {
    projectTaskStore.updateParams({status: selectedStatus, priority_level: selectedPriority});
}
watch(() => [projectTaskStore.selectedStatus, projectTaskStore.selectedPriority], handleTaskFilterChange);

onMounted(() => {
    projectStore.getProject({ id: route?.params?.projectId });
    projectTaskStore.getTasks();
    taskStore.fetchPriorityLevels();
    taskStore.fetchStatuses();
});
</script>
<template>
    <nav class="mb-8 text-sm">
        <ol class="flex items-center space-x-2">
            <li><RouterLink :to="{ name: 'projects.index'}" class="text-blue-600 hover:text-blue-800">Projects</RouterLink></li>
            <li class="text-gray-500">/</li>
        </ol>
    </nav>
    <div class="max-w-7xl mx-auto">
        <!-- Header with Actions -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold text-gray-800">{{ projectStore?.project?.name }}</h1>
                    <span class="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">{{ capWords(projectStore?.project?.status) }}</span>
                </div>
                <p class="mt-1 text-gray-600">Client: {{ projectStore?.project?.client_name }}</p>
            </div>
            <div class="flex gap-3">
                <RouterLink :to="{ name: 'projects.edit', params: {projectId: projectStore?.project?.id}}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                    <i class="fas fa-edit"></i>
                    Edit
                </RouterLink>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column - Project Info -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Overview Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Project Overview</h2>
                    <div class="space-y-4">
                        <p class="text-gray-700">
                           {{ projectStore?.project?.description }}
                        </p>
                        
                        <!-- Key Details Grid -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <div>
                                <div class="text-sm text-gray-500">Start Date</div>
                                <div class="font-medium">{{ formatDateOnly(projectStore?.project?.started_at) }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">End Date</div>
                                <div class="font-medium">{{ formatDateOnly(projectStore?.project?.ended_at) }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Budget</div>
                                <div class="font-medium">$ {{ projectStore?.project?.budget }}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Priority</div>
                                <div class="font-medium text-red-600">{{ projectStore?.project?.priority }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Progress Card -->
                <!-- <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Progress</h2>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">Overall Progress</span>
                                <span class="text-sm font-medium text-gray-700">65%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 65%"></div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h3 class="text-sm font-medium text-gray-700">Phases</h3>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Planning</span>
                                    <span>100%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Design</span>
                                    <span>80%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Development</span>
                                    <span>45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Testing</span>
                                    <span>20%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 20%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- Timeline Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <h2 class="text-2xl font-semibold text-gray-800">Project Tasks</h2>
                        <RouterLink :to="{name: 'tasks.create', params: {projectId: projectStore?.project?.id}}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                            <IconSVG name="plus-svg"/>
                            Add Task
                        </RouterLink>
                    </div>
                       <!-- Search and Filter Bar -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <!-- Search -->
                            <div class="relative flex-1">
                                <input
                                    v-model="projectTaskStore.searchInput" 
                                    type="text" 
                                    placeholder="Search tasks..." 
                                    class="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                                >
                                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            <!-- Filters -->
                            <div class="flex gap-3">
                                <select v-model="projectTaskStore.selectedStatus" class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Status</option>
                                    <option v-for="(status, index) in taskStore.statuses" :key="index" :value="status" class="capitalize">{{ status }}</option>
                                </select>
                                <select v-model="projectTaskStore.selectedPriority" class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Priority</option>
                                    <option v-for="(priority, index) in taskStore.priorityLevels" :key="index" :value="priority">{{ capWords(priority) }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div v-for="task in projectTaskStore?.tasks" :key="task.id" class="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md">
                            <RouterLink :to="{name: 'tasks.show', params: {taskId: task.id, projectId: projectStore?.project?.id}}" class="flex items-center justify-between">
                                <div class="flex items-center space-x-4 min-w-0">
                                    <span class="flex h-8 w-8 items-center shrink-0 justify-center rounded-full bg-blue-500 ring-4 ring-blue-100">
                                        <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <div class="flex-grow min-w-0">
                                        <h3 class="text-sm font-medium text-gray-900 truncate">{{ task.title }}</h3>
                                        <span class="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">{{ capWords(task.status) }}</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-500">{{ capWords(task.priority_level) }}</p>
                                    <div class="mt-1">
                                        <img v-if="false" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/50" alt="User avatar" />
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                    <PaginationComponent :pagination="projectTaskStore.pagination" size="sm" :onPageChange="projectTaskStore.changePage"/>
                </div>
            </div>
            <!-- Right Column - Team & Resources -->
            <div class="space-y-6">
                <!-- Team Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex justify-between items-center mb-5">
                        <h2 class="text-lg font-medium text-gray-900">Team</h2>
                        <div class="flex items-center space-x-3">
                            <button @click="isModalShow = true" class="hover:text-gray-800 text-gray-500">
                                <IconSVG name="plus-svg"/>
                            </button>
                            <AssignProjectTeamModal
                                v-if="isModalShow"
                                @update:isModalShow="val => isModalShow = val"
                                :project="projectStore?.project"
                                @data-added="refetchProject"
                            />
                        </div>
                    </div>
                    <div class="space-y-4">
                        <!-- Project Manager -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-500 mb-2">Project Manager</h3>
                            <div v-if="projectStore?.project?.manager" class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <img v-if="projectStore?.project?.manager?.avatar?.['thumb-60']" :src="projectStore?.project?.manager?.avatar?.['thumb-60']" class="h-10 w-10  border-2 border-white outline outline-2 outline-blue-400 rounded-full" alt="">
                                    <DefaultUserPic v-else :name="projectStore?.project?.manager?.name" class="h-10 w-10 border-2"/>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ projectStore?.project?.manager?.name }}</p>
                                    <p class="text-sm text-gray-500">{{ projectStore?.project?.manager?.email }}</p>
                                </div>
                            </div>
                            <div v-else class="flex items-center space-x-3 ml-2">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">No Manager have been assigned</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Team Members -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-500 mb-2">Team Members</h3>
                            <div v-if="projectStore?.project?.assigned_members?.length > 0" class="space-y-3">
                                <div v-for="member in projectStore?.project?.assigned_members" :key="member.id" class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <img v-if="member?.avatar?.['thumb-60']" :src="member?.avatar?.['thumb-60']" class="h-10 w-10  border-2 border-white outline outline-2 outline-blue-400 rounded-full" alt="">
                                        <DefaultUserPic v-else-if="member.name" :name="member.name" class="h-10 w-10 border-2"/>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                                        <p class="text-xs text-gray-500">{{ member.role }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex items-center space-x-3 ml-2">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">No team members have been assigned</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Files & Resources -->
                <!-- <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Files & Resources</h2>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-file-pdf text-red-500"></i>
                                <span class="text-sm text-gray-700">Project Brief.pdf</span>
                            </div>
                            <button class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-file-image text-blue-500"></i>
                                <span class="text-sm text-gray-700">Design Mockups.zip</span>
                            </div>
                            <button class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div> -->

                <!-- Quick Stats -->
                <!-- <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-blue-600 text-2xl font-bold">24</div>
                            <div class="text-sm text-gray-600">Tasks</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-green-600 text-2xl font-bold">15</div>
                            <div class="text-sm text-gray-600">Completed</div>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <div class="text-yellow-600 text-2xl font-bold">6</div>
                            <div class="text-sm text-gray-600">Issues</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-purple-600 text-2xl font-bold">8</div>
                            <div class="text-sm text-gray-600">Updates</div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>