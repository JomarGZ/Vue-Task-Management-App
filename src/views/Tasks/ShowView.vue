<script setup>
import PageHeader from '@/components/PageHeader.vue';
import { Icon } from '@iconify/vue';
import TaskAssigneesSection from '@/components/TaskAssigneesSection.vue';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TaskMainDetails from '@/components/TaskMainDetails.vue';
import TaskProgressSection from '@/components/TaskProgressSection.vue';
import TaskLinkSection from '@/components/TaskLinkSection.vue';
import TaskCommentSection from '@/components/TaskCommentSection.vue';
const projectTaskStore = useProjectTaskStore();
const route = useRoute();
onMounted(async() => {
    await projectTaskStore.getTask(route.params.taskId);
});
</script>
<template>
      <div class="container mx-auto px-4 py-8">
        <!-- Task Header -->
         <div class="flex items-center justify-between mb-6">
            <page-header headerName="Task Dashboard">
                    <nav class="flex mt-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <button type="button" @click="$router.back()"  class=" cursor-pointer text-gray-700 hover:text-blue-600 text-sm">Tasks</button>
                            </li>
                            <li aria-current="page" class="min-w-0">
                                <div class="flex items-center gap-2 min-w-0 max-w-[300px] overflow-hidden">
                                    <Icon icon="weui:arrow-outlined" width="10" height="20" class="text-gray-400 shrink-0"/>
                                    <span class="text-gray-500 text-sm truncate capitalize">
                                        {{ projectTaskStore.task?.title }}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
            </page-header>
             <div class="flex space-x-3">
                <router-link :to="{name: 'tasks.edit', params: {taskId: $route.params?.taskId}}" class="px-4 py-2 bg-blue-600 flex gap-2 items-center justify-center text-white rounded-lg hover:bg-blue-700 transition">
                    <Icon icon="bxs:edit" width="24" height="24" />Edit Project
                </router-link>
            </div>
        </div>
        <div class="bg-gray-50 rounded-xl shadow-md overflow-hidden mb-6">
            <TaskMainDetails
                :priority="projectTaskStore.task?.priority_level"
                :status="projectTaskStore.task?.status"
                :title="projectTaskStore.task?.title || ''"
                :startDate="projectTaskStore.task?.started_at"
                :dueDate="projectTaskStore.task?.deadline_at"
                :description="projectTaskStore.task?.description || ''"
            />
            <TaskProgressSection/>
            <TaskLinkSection/>
            <task-assignees-section
                :assignees="projectTaskStore.task?.assigned_users"
            />
        </div>
        <TaskCommentSection/>
    </div>
  </template>