<script setup>
import { Icon } from '@iconify/vue';
import ChatMemberItem from './ChatMemberItem.vue';
defineProps({
    participants: {
        type: Array,
        default: () => []
    },
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    }
})
</script>

<template>
    <div v-if="isFetching" class="flex items-center justify-center py-14 text-gray-500">
        <Icon icon="eos-icons:three-dots-loading" width="40" height="40" />
    </div>
    <div v-else-if="error">
        <p class="text-xs text-red-600 text-center">Something went wrong! please try again later.</p>
    </div>
    <template v-else-if="participants.length > 0">
         <ul class="space-y-1">
            <ChatMemberItem  
                v-for="participant in participants"
                :key="participant?.id"
                :position="participant?.position"
                :name="participant?.name"
                :avatar="participant.avatar?.['thumb-60']"
            />
        </ul>
    </template>
    <div v-else>
        <p class="text-center text-gray-600 text-sm py-5">No participants!</p>
    </div>
</template>