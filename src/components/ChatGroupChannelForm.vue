<script setup>
import { Icon } from '@iconify/vue';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import AppParticipantTag from './AppParticipantTag.vue';
import { computed, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import AppUserDropDownList from './AppUserDropDownList.vue';
import {z} from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
const props = defineProps({
    isModalShow: {
        type: Boolean,
        default: false
    },
    isActionLoading: {
        type: Boolean,
        default: false
    }
})
const schema = z.object({
    name: z.string().min(1, 'Name is required.').max(100, 'Name must be 255 maximum or less characters.'),
    description: z.string()
    .max(300, 'Description must be ≤300 characters')
    .transform(val => val || null)
    .nullable()
    .optional()
})
const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema)
})

const userQuery = ref('');
const hasSearch = ref(false);
const selectedUsers = ref([]);
const selectedUserIds = computed(() => selectedUsers.value?.length > 0 ? selectedUsers.value.map(u => u.id) : []);
const isActiondisabled = computed(() => isSubmitting.value || props.isActionLoading)
const emit = defineEmits(['onModalShow', 'onModalClose', 'onSubmit']);
const channelParticipantStore = useChannelParticipant();


const addSelectedUser = (user) => {
    selectedUsers.value = [...selectedUsers.value, user];
}
const removeSelectedUser = (user) => {
    if (!user) return;
    selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id);
}

const debounceUserSearch = debounce(async(search) => {
    hasSearch.value = !!search.trim();
    await channelParticipantStore.searchParticipants(search, selectedUserIds.value);
}, 300)
watch(selectedUserIds, (value) => {
   channelParticipantStore.removeSelectedItemOnTheList(value)
});





const resetOnCloseModal = () => {
    userQuery.value = '';
    selectedUsers.value = []
    resetForm()
}

watch(userQuery, debounceUserSearch);
watch(() => props.isModalShow, (bool) => {
    if (!bool) {
        resetOnCloseModal();
    }
})
const onSumbit = handleSubmit((values) => {
    const payload = {
        ...values,
        ...(selectedUserIds.value.length ? {participant_ids: selectedUserIds.value} : {})
    }
    emit('onSubmit', payload);
})
</script>

<template>
    <button type="button" @click="$emit('onModalShow')" class="hover:bg-sky-200 rounded-lg cursor-pointer p-1" title="Create team chat channel"><Icon icon="fluent-color:chat-add-16" width="30" height="30" /></button>
    <teleport to='body'>
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform opacity-0 scale-125"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-125"
        >
        <div v-if="isModalShow" class="fixed inset-0 bg-gray-900/50 z-40 flex items-center justify-center">
            <form @submit.prevent="onSumbit" class="p-6 bg-white rounded-lg shadow-md min-w-2xl max-w-3xl">
                <div class="border-b p-4 flex justify-between items-center">
                    <h3 class="text-lg font-semibold">Create New team channel</h3>
                    <button
                        type="button"
                        @click="$emit('onModalClose')"
                        class="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <Icon icon="ic:sharp-close" width="24" height="24" />
                    </button>
                </div>

                <div class="p-4 space-y-4">
                    <div>
                        <label for="channel-name" class="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder="e.g. Marketing Team"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="name" class="text-red-700 text-sm"/>
                    </div>

                    <div>
                        <label for="channel-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Field name="description" v-slot="{ field, errorMessage }">
                            <textarea
                                id="channel-description"
                                rows="3"
                                placeholder="What's this channel about?"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errorMessage }"
                                v-bind="field"
                            ></textarea>
                            <ErrorMessage name="description" class="text-red-700 text-sm"/>
                        </Field>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Add Participants</label>
                        
                        <div class="flex flex-wrap overflow-y-auto max-h-24 gap-2 mb-3">
                            <template v-if="selectedUsers.length > 0">
                                <AppParticipantTag
                                        v-for="s in selectedUsers"
                                        :key="s.id"
                                        :name="s.name"
                                        :avatar="s.avatar?.['thumb-60']"
                                        @remove-selected-user-tag="removeSelectedUser(s)"
                                   />
                            </template>
                        </div>

                        <div class="border-gray-200 border rounded-md overflow-hidden">
                            <div class="p-2">
                                <input 
                                    type="text"
                                    v-model="userQuery" 
                                    placeholder="Search team members..."
                                    class="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                            </div>
                                <AppUserDropDownList
                                    :hasSearch="hasSearch"
                                    :users="channelParticipantStore.dropdownParticipants"
                                    :isFetching="channelParticipantStore.isFetching"
                                    :error="channelParticipantStore.error"
                                    @on-select="(user) => addSelectedUser(user)"
                                />
                        </div>
                    </div>
                </div>
                <div class="border-t p-4 flex justify-end gap-3">
                    <button 
                        @click="$emit('onModalClose')"
                        type="button"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        :disabled="isActiondisabled"
                        class="px-4 py-2 cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        <span v-if="isActiondisabled"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                        Create Channel
                    </button>
                </div>
            </form>
        </div>
    </transition>
    </teleport>
</template>