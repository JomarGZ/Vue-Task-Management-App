<script setup>
import { computed, ref } from 'vue';
import TaskAddLinkModal from './TaskAddLinkModal.vue';
import TaskLinkItem from './TaskLinkItem.vue';
import TaskEditLinkModal from './TaskEditLinkModal.vue';
import { useTaskLink } from '@/stores/taskLinkStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { useRoute } from 'vue-router';
const props = defineProps({
    links: {
        type: Array,
        default: () => ([])
    }
})
const taskLinkStore = useTaskLink();
const projectTaskStore = useProjectTaskStore();
const route = useRoute();
const isAddFormModalShow = ref(false);
const isEditFormModalShow = ref(false);
const linksCount = computed(() => props.links.length);
const onDeleteLink = async (id) => {
    const success = await taskLinkStore.deleteLink(id);
    if (success) {
        await projectTaskStore.getTask(route.params.taskId)
    };
}
const onEdit = (link) => {
    taskLinkStore.editingLink = link
    isEditFormModalShow.value = true
}
</script>
<template>
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-medium text-gray-800">Related Links ({{ linksCount }}/4)</h3>
            <TaskAddLinkModal
                :linksCount="linksCount" 
                :isAddFormModalShow="isAddFormModalShow"
                :taskId="$route.params?.taskId"
                @modal-show="isAddFormModalShow = true"
                @modal-hide="isAddFormModalShow = false"
            />
        </div>
        <div class="space-y-3">
            <TaskLinkItem
                v-for="link in links"
                :key="link.id"
                :id="link.id"
                :title="link.title"
                :description="link.description"
                :type="link.type"
                :url="link.url"
                @delete-item="onDeleteLink"
                :loading="taskLinkStore.loading"
                @edit-item="() => onEdit(link)"
            />
        </div>
        <TaskEditLinkModal
            :taskId="$route.params.taskId"
            :isEditFormModalShow="isEditFormModalShow"
            @modal-hide="isEditFormModalShow = false"
        />
    </div>
  
</template>