<script setup>
import { Icon } from '@iconify/vue';
import ChatGroupChannelItem from './ChatGroupChannelItem.vue';

defineProps({
  channels: {
    type: Object,
    default: () => ({
      data: [],
      links: {},
      meta: {}
    })
  },
  isFetching: Boolean,
  error: Boolean
});

defineEmits(['selectChannel']);
</script>

<template>
  <nav>
    <ul class="space-y-1">
      <li v-if="isFetching" class="flex items-center justify-center text-gray-400">
        <Icon icon="eos-icons:loading" width="35" height="35" />
      </li>
      
      <li v-else-if="error" class="text-xs text-center text-red-700 py-6">
        There is an error fetching chat teams.
      </li>
      
      <template v-else-if="channels.data?.length > 0">
        <ChatGroupChannelItem
          v-for="channel in channels.data"
          :key="channel.id"
          @click="$emit('selectChannel', channel)"
          :name="channel.name"
        />
      </template>
      
      <li v-else class="py-5 text-center text-sm text-gray-400">
        No team chat.
      </li>
    </ul>
  </nav>
</template>