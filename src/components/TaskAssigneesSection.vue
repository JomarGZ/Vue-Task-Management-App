<script setup>
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import taskAssigneeItem from './taskAssigneeItem.vue';
import TaskAssignmentModal from './TaskAssignmentModal.vue';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { useRoute } from 'vue-router';
const showMore = ref(false)
const props = defineProps({
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: Object,
        default: () => ({})
    },
    assignees: {
        type: Array,
        default: () => ([])
    }
})
const projectTaskStore = useProjectTaskStore();
const route = useRoute();
const isTaskAssignmentModalShow = ref(false);
const firstTwoAssignees = computed(() => props.assignees?.length > 0 ? props.assignees.slice(0, 2) : [])
const moreAssignees = computed(() => props.assignees?.length >= 3  ? props.assignees.slice(2, Number(props.assignees.length)) : []);

const handleAssignMembers = async () => {
    const success = await projectTaskStore.assignMemberToTask(route.params.taskId);
    if (success) isTaskAssignmentModalShow.value = false;
}
</script>
<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-medium text-gray-800">Team</h3>
            <TaskAssignmentModal
                :isMaxxAssignees="assignees?.length >= 5"
                :taskAssignees="assignees" 
                :projectId="$route.params?.projectId"
                :show="isTaskAssignmentModalShow"
                @open-modal="isTaskAssignmentModalShow = !isTaskAssignmentModalShow"
                @close-modal="isTaskAssignmentModalShow = false"
                @submit="handleAssignMembers"
            />
        </div>
        <!-- Assignees -->
        <div class="mb-2 relative">
            <div class="text-xs text-gray-500 font-medium mb-2">ASSIGNEES ({{ assignees?.length || 0 }}/5)</div>
            <div class="space-y-2">
                <task-assignee-item
                    v-for="assignee in firstTwoAssignees"
                    :key="assignee.id"
                    :name="assignee.name"
                    :avatar="assignee.avatar?.['thumb-60']"
                    :position="assignee.position"
                    :id="assignee.id"
                    :loading="projectTaskStore.loading"
                    @delete-item="(assigneeId) => projectTaskStore.removeAssignee($route.params?.taskId, assigneeId)"
                />
                <Transition 
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="showMore"  class="space-y-2">
                        <task-assignee-item
                            v-for="assignee in moreAssignees"
                            :key="assignee.id"
                            :avatar="assignee.avatar?.['thumb-60']"
                            :position="assignee.position"
                            :name="assignee.name"
                            :id="assignee.id"
                            :loading="projectTaskStore.loading"
                            @delete-item="(assigneeId) => projectTaskStore.removeAssignee($route.params?.taskId, assigneeId)"
                        />
                    </div>
                </Transition>
                <div 
                    v-if="moreAssignees.length > 0"
                    class="flex items-center justify-center"
                >
                        <button @click="showMore = !showMore" class="text-center cursor-pointer flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 mt-2 py-1">
                        <span v-text="showMore ? 'Show Less' : `Show ${moreAssignees.length} More`"></span>
                        <Icon icon="ri:arrow-down-s-line" width="24" height="24" :class="{ 'transform rotate-180': showMore }" />
                    </button>
                </div>
            </div>
            <div v-if="isFetching" class="absolute bg-gray-50 text-gray-500 flex items-center justify-center inset-0">
                <Icon icon="eos-icons:loading" width="50" height="50" />
            </div>
             <div 
                v-if="assignees.length === 0" 
                class="absolute inset-0 flex items-center text-gray-400 justify-center bg-white bg-opacity-70"
             >
                <p>No Assignees found!</p>
            </div>
             <div 
                v-if="Object.keys(error).length > 0" 
                class="absolute inset-0 flex items-center text-gray-400 justify-center bg-white bg-opacity-70"
             >
                <p>No Assignees found!</p>
            </div>
        </div>
    </div>
</template>