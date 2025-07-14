<script setup>
import { Icon } from '@iconify/vue';
import SimpleAvatar from './SimpleAvatar.vue';

defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['direct', 'group', 'general'].includes(value)
    },
    channel: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <template v-if="type === 'direct'">
        <div  class="flex flex-col items-center justify-center space-y-2 ">
            <SimpleAvatar size="lg" :name="channel.recipient?.name" :avatar="channel.recipient?.avatar?.['thumb-200']"/>
            <p class="text-xl font-bold capitalize">{{ channel.recipient?.name }}</p>
            <p class="text-sm font-serif capitalize">{{ channel.recipient?.position }}</p>
        </div>
    </template>
    <template v-else-if="type === 'group'">
        <div class="flex flex-col items-center justify-center space-y-2">
            <Icon icon="fluent-color:chat-multiple-24" width="100" height="100" />
            <p class="text-xl font-bold capitalize">{{ channel.name }}</p>
            <p class="text-xs font-mono capitalize">{{ channel.description }}</p>
        </div>
    </template>
    <template v-else>
        <div class="flex flex-col items-center justify-center space-y-2">
            <Icon icon="fluent-color:chat-multiple-24" width="100" height="100" />
            <p class="text-xl font-bold">General Discussion</p>
        </div>
    </template>
</template>