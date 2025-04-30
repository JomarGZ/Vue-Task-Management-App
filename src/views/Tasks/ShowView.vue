<script setup>
import CommentsSection from '@/components/CommentsSection.vue';
import DefaultUserPic from '@/components/DefaultUserPic.vue';
import AssignTaskModal from '@/components/Tasks/AssignTaskModal.vue';
import TaskEditModal from '@/components/Tasks/TaskEditModal.vue';
import UnAssignedModal from '@/components/Tasks/UnAssignedModal.vue';
import { formatDateWithTime, getInitials } from '@/composables/useFormatters';
import { capWords } from '@/composables/useUtil';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { useTaskComments } from '@/stores/taskCommentStore';
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const isUnassignModalShow = ref(false);
const isModalShow = ref(false);
const isEditTaskModalShow = ref(false);
const route = useRoute();
const projectStore = useProjectStore();
const taskStore = useProjectTaskStore();
const taskCommentStore = useTaskComments();
const taskId = computed(() => route?.params?.taskId);

const onStatusChange = () => {
    taskStore.updateStatus({ id: taskId.value });
}
onMounted(async () => {
    await Promise.all([
        taskStore.fetchStatuses(),
        taskStore.getTask({ id: taskId.value }),
        projectStore.getProject({ id: route.params.projectId }),
        taskCommentStore.fetchComments({id: taskId.value})
    ])
    
})
watch(() =>[taskId.value, route.params.projectId], () => {
    taskStore.getTask({ id: taskId.value });
    projectStore.getProject({ id: route.params.projectId });
})
onBeforeUnmount(() => {
    taskStore.taskData = {}
});
</script>
<template>
        <!-- Breadcrumb -->
        <nav class="mb-8 text-sm flex items-center justify-between">
            <ol class="flex items-center space-x-2">
                <li><RouterLink :to="{name: 'projects.index'}" class="text-blue-600 hover:text-blue-800">Projects</RouterLink></li>
                <li class="text-gray-500">/</li>
                <li><RouterLink :to="{name: 'projects.show', params: {projectId: projectStore?.project?.id}}" class="text-blue-600 hover:text-blue-800">{{ projectStore?.project?.name }}</RouterLink></li>
            </ol>
            <div>
                <button @click="isEditTaskModalShow = true">
                    <IconSVG name="edit-svg"/>
                </button>
                <TaskEditModal
                    v-if="isEditTaskModalShow"
                    @update:isEditTaskModalShow="val => isEditTaskModalShow = val"
                    :task="taskStore?.taskData"
                />
            </div>
        </nav>

        <!-- Task Header -->
        <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <div class="flex flex-col md:flex-row items-center md:items-start justify-between mb-4 text-center md:text-left">
                <div class="mb-4 md:mb-0 flex-grow min-w-0">
                    <h1 class="text-xl md:text-2xl font-bold min-w-0 text-gray-900 break-words whitespace-normal">
                        {{ taskStore?.taskData?.title }}
                    </h1>
                </div>
                <span class="px-3 py-1 shrink-0 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    {{ capWords(taskStore?.taskData?.status) }}
                </span>
            </div>

            <!-- Project Info -->
            <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600 text-center md:text-left">
                <span class="flex items-center justify-center md:justify-start">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    {{ projectStore?.project?.name }}
                </span>
                <p>Created: <span class="text-gray-900 font-semibold">{{ formatDateWithTime(taskStore?.taskData?.created_at) || '--.--' }}</span></p>
                <p>Due: <span class="text-gray-900 font-semibold">{{ formatDateWithTime(taskStore?.taskData?.deadline_at) || '--.--' }}</span></p>
            </div>

        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Left Column -->
            <div class="col-span-1 md:col-span-2 space-y-6">
                <!-- Description -->
                <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 class="text-lg font-semibold mb-4">Description</h2>
                    <p class="text-gray-700 break-words">{{ taskStore?.taskData?.description }}</p>
                </div>

                <!-- Links -->
                <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 class="text-lg font-semibold mb-4">Related Links</h2>
                    <div class="space-y-3">
                        <a href="#" class="block text-blue-600 hover:text-blue-800">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                                </svg>
                                Pull Request #456
                            </div>
                        </a>
                        <a href="#" class="block text-blue-600 hover:text-blue-800">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                                </svg>
                                Documentation
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Comments -->
                <CommentsSection
                  :comments="taskCommentStore.comments"
                  :isFetchLoading="taskCommentStore.isFetchLoading"
                  :isFetchError="taskCommentStore.isFetchError"
                  v-model:content="taskCommentStore.form.content"
                  @submit-comment="taskCommentStore.handleSubmitComment({id: taskId})" 
                />
            </div>

            <!-- Right Column -->
            <div class="col-span-1 space-y-6">
                <!-- Status -->
                <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 class="text-lg font-semibold mb-4">Status</h2>
                    <select @change="onStatusChange" v-model="taskStore.selectedStatus" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option
                            :key="status"
                            :value="status"
                            v-for="status in taskStore?.statuses">
                                {{ capWords(status) }}
                        </option>
                    </select>
                </div>

                <!-- Assignments -->
                <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold">Assignments</h2>
                        <div class="flex items-center gap-2">
                            <div>
                                <button @click="isUnassignModalShow = true">
                                    <IconSVG name="minus-svg"/>
                                </button>
                                <UnAssignedModal
                                    v-if="isUnassignModalShow"
                                    @update:isUnassignModalShow="val => isUnassignModalShow = val"
                                    :task="taskStore?.taskData"
                                    @taskUpdate="taskStore.getTask({id: route?.params?.taskId})"
                                />
                            </div>
                            <div>
                                <button @click="isModalShow = true"><IconSVG name="plus-svg"/></button>
                                <AssignTaskModal 
                                    v-if="isModalShow"
                                    @update:isModalShow="val => isModalShow = val"
                                    :task="taskStore?.taskData"
                                    @taskUpdate="taskStore.getTask({id: route?.params?.taskId})"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <template v-if="taskStore?.taskData?.assigned_users?.length > 0">
                            <div 
                                v-for="assignee in taskStore?.taskData?.assigned_users"
                                :key="assignee.id"
                            >
                                <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Developer</label> -->
                                <div class="flex items-center space-x-2">
                                    <img v-if="assignee.avatar?.['thumb-60']" :src="assignee.avatar?.['thumb-60']" class="w-8 h-8 rounded-full" alt="Developer avatar">
                                    <DefaultUserPic v-else :name="assignee.name" class="w-8 h-8 border-2 text-sm"/>
                                    <span class="text-gray-900">{{ assignee.name }}</span>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div>
                                <p>Unassigned</p>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Metadata -->
                <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 class="text-lg font-semibold mb-4">Details</h2>
                    <div class="space-y-3 text-sm">
                        <div v-if="taskStore?.taskData?.priority_level">
                            <span class="text-gray-500">Priority:</span>
                            <span class="ml-2 text-gray-900">{{ capWords(taskStore?.taskData?.priority_level) }}</span>
                        </div>
                        <div v-if="taskStore?.taskData?.started_at">
                            <span class="text-gray-500">started on:</span>
                            <span class="ml-2 text-gray-900">{{ taskStore?.taskData?.started_at }}</span>
                        </div>
                        <div v-if="taskStore?.taskData?.deadline_at">
                            <span class="text-gray-500">Deadline:</span>
                            <span class="ml-2 text-gray-900">{{ taskStore?.taskData?.deadline_at }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </template>