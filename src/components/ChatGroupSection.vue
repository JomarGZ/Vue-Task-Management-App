<script setup>
import { Icon } from '@iconify/vue';
import ChatDirectChannelItem from './ChatDirectChannelItem.vue';
import { computed } from 'vue';
import ChatGroupChannelItem from './ChatGroupChannelItem.vue';
const props = defineProps({
    channels: {
        type: Object,
        default: () => ({
            data: [],
            links: {},
            metta: {}
        })
    }
})
defineEmits(['on-general-channel', 'onSelectChannel'])
const directChannels = computed(() => props.channels.data.filter(c => c.is_direct));
const groupChannels = computed(() => props.channels.data.filter(c => !c.is_direct));
</script>
<template>
    <div class="w-20 md:w-64 bg-gray-50 border-r border-gray-200 flex flex-col ">
        <div class="p-4 border-b border-gray-200 flex justify-center items-center">
            <div class="ml-3">
                <button type="button" @click="$emit('on-general-channel')" class="text-lg flex justify-center items-center cursor-pointer hover:bg-sky-100 py-1 px-2 rounded-lg font-semibold">
                    <Icon icon="fluent-color:people-chat-48" width="48" height="48" />
                    <span>General Chat</span>
                </button>
            </div>
        </div>
        
        <div class="flex-1 p-2">
            <nav>
                <ul class="space-y-1">
                    <template v-if="directChannels.length > 0">
                        <li class="font-bold text-sm text-gray-700 py-2 border-b border-gray-200 ml-2">Direct Messages</li>
                        <ChatDirectChannelItem
                            v-for="channel in directChannels"
                            @onSelectChannel="$emit('onSelectChannel', channel)"
                            :key="channel.id"
                            :recipient="channel.recipient"
                        />
                    </template>
                    <template v-if="groupChannels.length > 0">
                        <li class="font-bold text-sm text-gray-700 py-2 border-y border-gray-200 ml-2">Team Messages</li>
                           <ChatGroupChannelItem
                                v-for="channel in groupChannels"
                                :key="channel.id"
                                @onSelectChannel="$emit('onSelectChannel', channel)"
                                :name="channel.name"
                           />
                    </template>
                </ul>
            </nav>
        </div>
        
        <!-- User Profile -->
        <div class="p-3 border-t border-gray-200 flex items-center justify-center md:justify-start">
            <div class="relative">
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" class="h-10 w-10 rounded-full">
                <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div class="hidden md:block ml-2">
                <p class="text-sm font-medium">You</p>
                <p class="text-xs text-gray-500">Admin</p>
            </div>
        </div>
    </div>
</template>