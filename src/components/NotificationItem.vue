<script setup>
import { Icon } from '@iconify/vue'
import { formatDateDistance } from '@/composables/useFormatters'
import { computed } from 'vue'
import { getNotificationTypeByValue } from '@/constants/notificationType'
import { getTaskPriorityByValue } from '@/constants/task'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => [
      'task assignment',
      'project assignment',
      'task comment',
      'system'
    ].includes(value)
  },
  data: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  readAt: {
    type: String,
    default: null
  },
  redirectTo: {
    type: [Object, String],
    default: '#'
  },
  size: {
    type: String,
    default: 'base',
    validator: value => ['base', 'compact'].includes(value)
  }
})

const sizeClasses = {
  base: {
    container: 'px-6 py-4',
    iconSize: 24,
    textSize: 'text-sm'
  },
  compact: {
    container: 'px-4 py-2',
    iconSize: 20,
    textSize: 'text-xs'
  }
}[props.size]

defineEmits(['read-notification', 'dismiss'])
const priorityConfig = computed(() => props.data?.priority ? getTaskPriorityByValue(props.data?.priority) : {});
const configType = computed(() => props.type ? getNotificationTypeByValue(props.type) : {});
</script>

<template>
  <router-link
    :to="redirectTo"
    class="block hover:bg-gray-200 transition-colors"
    @click="$emit('read-notification')"
    :class="[
      sizeClasses.container,
        !readAt ? 'bg-gray-100' : ''
      ]"
  >
    <div class="flex items-start gap-3">
      <div 
        class="flex-shrink-0 rounded-lg p-2"
        :class="configType.badgeClass"
      >
        <Icon 
          :icon="configType.icon" 
          :width="sizeClasses.iconSize" 
          :height="sizeClasses.iconSize"
        />
      </div>

      <div class="flex-1 min-w-0">
        <template v-if="type === 'task assignment'">
          <p :class="['font-medium text-gray-900 truncate', sizeClasses.textSize]">
            <span class="font-semibold">New task assigned:</span> {{ data.taskTitle }} 
          </p>
          <p :class="['text-gray-500 mt-1', sizeClasses.textSize]">
            From {{ data.assigner.name }} • Due {{ data.dueDate || 'Not set' }}
            <span class="ml-2" :class="priorityConfig.color">{{ priorityConfig.label }} Priority</span>
          </p>
        </template>
        <template v-else-if="type === 'project assignment'">
          <p :class="['font-medium text-gray-900 truncate', sizeClasses.textSize]">
            <span class="font-semibold">Added to project:</span> {{ data.projectName }}
          </p>
        </template>
        <template v-else-if="type === 'task comment'">
          <p :class="['font-medium text-gray-900 truncate', sizeClasses.textSize]">
            <span class="font-semibold">New comment on:</span> {{ data.taskTitle }}
          </p>
          <div :class="['text-gray-500 mt-1 line-clamp-2', sizeClasses.textSize]">
            "{{ data.commentPreview }}"
            <span class="text-gray-400 capitalize">— {{ data.commenter.name }}</span>
          </div>
        </template>
        <template v-else-if="type === 'system'">
          <p :class="['font-medium text-gray-900 truncate', sizeClasses.textSize]">
            <span class="font-semibold">System Update:</span> {{ data.title }}
          </p>
          <p :class="['text-gray-500 mt-1 line-clamp-2', sizeClasses.textSize]">
            {{ data.message }}
          </p>
        </template>
        <p :class="['text-gray-400 mt-1', sizeClasses.textSize]">
          {{ formatDateDistance(date) }}
        </p>
      </div>
      <button 
        type="button"
        class="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
        @click.prevent="$emit('dismiss')"
      >
        <Icon icon="ph:x" :width="sizeClasses.iconSize - 4" />
      </button>
    </div>
  </router-link>
</template>