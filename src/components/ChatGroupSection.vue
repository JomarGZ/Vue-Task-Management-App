<script setup>
import { Icon } from '@iconify/vue';
import ChannelList from './ChannelList.vue';
import ChatGroupChannelAdd from './ChatGroupChannelAdd.vue';
import { ref } from 'vue';
import { useChannel } from '@/stores/channelStore';
defineProps({
    channels: {
        type: Object,
        default: () => ({
            data: [],
            links: {},
            metta: {}
        })
    },
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: Boolean,
        default: false
    }
})
const isModalShow = ref(false)
defineEmits(['on-general-channel', 'onSelectChannel'])
const channelStore = useChannel();
const handleAddChannel = async (values) => {
   const success = await channelStore.storeChannel(values)
   if (success) isModalShow.value = false;
}
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
            <div class="flex items-center justify-between px-2">
                <p class="text-lg text-gray-700 font-medium text-center">Team chat</p>
                <ChatGroupChannelAdd
                    :isModalShow="isModalShow"
                    @emit-submission="handleAddChannel"
                    @on-modal-show="isModalShow = true"
                    @on-modal-close="isModalShow = false"
                />
            </div>
            
            <nav>
                <ul class="space-y-1">
                   <ChannelList
                        :channels="channels"
                        :isFetching="isFetching"
                        :error="error"
                        @selectChannel="$emit('onSelectChannel', $event)"
                    />
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