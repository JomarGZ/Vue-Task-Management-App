<script setup>
import SimpleAvatar from './SimpleAvatar.vue';
defineProps({
    recipient: {
        type: Object,
        required: true
    },

})
defineEmits(['onSelectChannel'])
</script>

<template>
        <li class="py-2 px-2 hover:bg-sky-100 rounded-lg  transition-colors hover:border-sky-300">
         <button type="button" @click="$emit('onSelectChannel')" class="flex items-center cursor-pointer w-full">
                <SimpleAvatar
                    :name="recipient?.name"
                    :avatar="recipient?.avatar?.['thumb-60']"
                />
                <div class="ml-2 min-w-0">
                    <p class="text-sm font-medium capitalize truncate">{{ recipient?.name }}</p>
                    <p class="block text-xs text-gray-500 capitalize truncate">{{ recipient?.position }}</p>
                </div>
         </button>
        </li>
</template>