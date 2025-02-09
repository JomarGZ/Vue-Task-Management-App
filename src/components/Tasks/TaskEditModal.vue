<script setup>
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import Modal from '../Modal.vue';
import { onBeforeUnmount, onMounted } from 'vue';
const props = defineProps({
    isEditTaskModalShow: Boolean,
    task: Object
})
const editMode = true;
const emit = defineEmits(['update:isEditTaskModalShow']);
const taskStore = useProjectTaskStore();
const handleEditSubmit = () => {
    taskStore.updateTask({id: props?.task?.id}).then(() => {
        emit('update:isEditTaskModalShow', false);
    })
}
onMounted(() => {
    taskStore.getTask({id : props?.task?.id}, editMode);
    taskStore.fetchPriorityLevels();
});
onBeforeUnmount(() => {
    taskStore.resetForm();
})
</script>
<template>
    <teleport to='body'>
        <Modal>
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Update task</h2>
               
                <form @submit.prevent="handleEditSubmit" class="space-y-6">
                    <!-- Rest of the form remains the same -->
                    <!-- Task Title -->
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="col-span-2">
                            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                            <input v-model="taskStore.form.title" type="text" id="title" name="title"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <ValidationError :errors="taskStore.errors" field="title"/>
                        </div>

                        <!-- Description -->
                        <div class="col-span-2">
                            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea v-model="taskStore.form.description" id="description" name="description" rows="4"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            <ValidationError :errors="taskStore.errors" field="description"/>
                        </div>

                        <!-- Due Date -->
                        <div>
                            <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">DeadLine</label>
                            <input v-model="taskStore.form.deadline_at" type="date" id="dueDate" name="dueDate"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>

                        <!-- Priority -->
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select v-model="taskStore.form.priority_level" id="priority" name="priority"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="low">Select Priority</option>
                                <option
                                    v-for="level in taskStore?.priorityLevels"
                                    :key="level"
                                    :value="level">   
                                        {{ level }}
                                </option>
                            </select>
                        </div>

                        <!-- Assignee -->

                        <!-- Tags -->
                        <!-- <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Frontend</span>
                                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Design</span>
                                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">UI/UX</span>
                                <button type="button" class="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                                    + Add Tag
                                </button>
                            </div>
                        </div> -->

                        <!-- Attachments -->
                        <!-- <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div class="space-y-1 text-center">
                                    <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-3"></i>
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                </div>
                            </div>
                        </div> -->
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-end space-x-4 pt-4">
                        <button
                              @click="$emit('update:isEditTaskModalShow', false)"
                              type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                        </button>
                        <button 
                            :disabled="taskStore.loading" 
                            type="submit" 
                            :class="{
                            'px-6 py-3 flex items-center justify-center gap-2 text-white rounded-lg font-medium': true,
                            'hover:bg-indigo-700 bg-indigo-600':! taskStore.loading,
                            'bg-indigo-300': taskStore.loading 
                            }"
                        >
                            <IconSpinner v-if="taskStore.loading"/>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    </teleport>
</template>