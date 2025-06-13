<template>
    <div :class="`relative shrink-0 ${sizesConfig[size]?.container} rounded-full flex items-center justify-center`">
        <img v-if="avatar" :src="avatar" alt="User" :class="`${sizesConfig[size].avatarSize} rounded-full`">
        <div
            v-else 
            class="text-white flex items-center justify-center rounded-full"
            :class="[
                bgColorClass,
                sizesConfig[size].avatarSize,
                sizesConfig[size].fontSize
            ]"    
        >
            {{ getInitials(name) }}
        </div>
        <span :class="`absolute bottom-0 right-0 block ${sizesConfig[size]?.onlineIndicator} rounded-full bg-green-500 border-2 border-white`"></span>
    </div>
</template>
<script setup>
import { getInitials } from '@/composables/useFormatters';
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'sm',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
})

const sizesConfig = {
    sm: {
        container: 'h-10 w-10',
        avatarSize: 'h-9 w-9',
        onlineIndicator: 'h-3 w-3',
        fontSize: 'text-sm'
    },
    lg: {
        container: 'h-20 w-20',
        avatarSize: 'h-18 w-18',
        onlineIndicator: 'h-6 w-6',
        fontSize: 'text-xl'
    }
}

const letterColorMap = {
  A: 'bg-red-500',
  B: 'bg-orange-500',
  C: 'bg-amber-500',
  D: 'bg-yellow-500',
  E: 'bg-lime-500',
  F: 'bg-green-500',
  G: 'bg-emerald-500',
  H: 'bg-teal-500',
  I: 'bg-cyan-500',
  J: 'bg-sky-500',
  K: 'bg-blue-500',
  L: 'bg-indigo-500',
  M: 'bg-violet-500',
  N: 'bg-purple-500',
  O: 'bg-fuchsia-500',
  P: 'bg-pink-500',
  Q: 'bg-rose-500',
  R: 'bg-red-600',
  S: 'bg-orange-600',
  T: 'bg-amber-600',
  U: 'bg-yellow-600',
  V: 'bg-lime-600',
  W: 'bg-green-600',
  X: 'bg-emerald-600',
  Y: 'bg-teal-600',
  Z: 'bg-cyan-600'
}
const bgColorClass = computed(() => {
    const letter = props.name?.charAt(0).toUpperCase() || '';
    return letterColorMap[letter] || 'bg-gray-600'
})
</script>