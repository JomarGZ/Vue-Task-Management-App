<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import ChatGroupChannelEdit from './ChatGroupChannelEdit.vue'
import { useChannel } from '@/stores/channelStore';
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['remove-participant', 'delete-channel'])
const channelStore = useChannel();

const isModalShow = ref(false);
const updatedChannel = ref({});

const handleUpdate = async (payload) => {
   
    const data = await channelStore.updateChannel(props.channel?.id, payload)
    if (data.success) {
        isModalShow.value = false
        updatedChannel.value = data.channel
    }
}
</script>
<template>
     <Menu as="div" class="relative">
        <MenuButton class="text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg p-1 hover:text-primary-600 transition-colors">
            <Icon icon="ph:dots-three-outline-fill" width="20" height="20" />
        </MenuButton>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems class="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                   <button
                        @click="isModalShow = true"
                        :class="[
                        active ? 'bg-gray-200' : '',
                        'group flex w-full items-center text-nowrap cursor-pointer text-gray-900 rounded-md px-2 py-2 text-sm'
                        ]"
                    >
                        <Icon icon="fluent-color:edit-24" width="20" height="20"  class="mr-2"/>
                        Edit Channel
                    </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button
                    type="button"
                    @click="$emit('delete-channel')"
                    :class="[
                    active ? 'bg-gray-100' : '',
                    'group flex w-full items-center text-nowrap cursor-pointer text-gray-900 rounded-md px-2 py-2 text-sm'
                    ]"
                >   
                    <Icon icon="flat-color-icons:full-trash" width="20" height="20" class="mr-2"/>
                    Delete Channel
                </button>
                </MenuItem>
            </div>
            </MenuItems>
        </transition>
        </Menu>
        <div>
            <ChatGroupChannelEdit 
                @remove-participant="(user) => $emit('remove-participant', user)"
                :updatedChannel="updatedChannel"
                :isModalShow="isModalShow"
                :channelToEdit="channel"
                @emit-submission="handleUpdate"
                @onModalClose="isModalShow = false"
            />
        </div>
</template>