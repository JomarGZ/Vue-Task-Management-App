<script setup>
import PageHeader from '@/components/PageHeader.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectTeamSection from '@/components/ProjectTeamSection.vue';
import TaskTable from '@/components/TaskTable.vue'
import { useProjectStore } from '@/stores/projectStore';
import {Icon} from '@iconify/vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const projectStore = useProjectStore();
onMounted(() => projectStore.getProject(route.params?.projectId))
</script>
<template>
    <div class="px-4 py-8">
        <!-- Project Header -->
        <div class="flex justify-between items-center mb-6">
            <page-header headerName="Project Dashboard">
                <nav class="flex mt-2" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <router-link :to="{ name: 'projects.index'}" class="text-gray-700 hover:text-blue-600 text-sm">Projects</router-link>
                        </li>
                        <li aria-current="page" class="min-w-0">
                            <div class="flex items-center gap-2 min-w-0 max-w-[300px] overflow-hidden">
                                <Icon icon="weui:arrow-outlined" width="10" height="20" class="text-gray-400 shrink-0"/>
                                <span class="text-gray-500 text-sm truncate capitalize">
                                    {{ projectStore.project?.name }}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </page-header>
            <div class="flex space-x-3">
                <router-link :to="{name: 'projects.edit', params: {projectId: projectStore.project?.id}}" class="px-4 py-2 bg-blue-600 flex gap-2 items-center justify-center text-white rounded-lg hover:bg-blue-700 transition">
                    <Icon icon="bxs:edit" width="24" height="24" />Edit Project
                </router-link>
            </div>
        </div>

        <!-- Main Project Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <!-- Project Header Section -->
            <ProjectDetails
                v-if="!projectStore.isLoading"
                :title="projectStore.project?.name || ''"
                subTitle="Complete redesign and development of the company's online store with new features"
                :startedDate="projectStore.project?.started_at || ''"
                :endDate="projectStore.project?.ended_at || ''"
                :clientName="projectStore.project?.client_name || ''"
                budget="24000"
                :description="projectStore.project?.description || ''"
                status="active"
            />
            <ProjectTeamSection v-if="!projectStore.isLoading" :teamAssignees="projectStore.project?.assigned_members"/>
           <TaskTable/>
        </div>
    </div>
</template>