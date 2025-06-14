<script setup>
import {Icon} from '@iconify/vue';
import AppUserDropdownItem from './AppUserDropdownItem.vue'
defineProps({
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    },
    users: {
        type: Array,
        default: () => ([])
    },
    hasSearch: {
        type: Boolean,
        default: false
    }
})
defineEmits(['on-select'])
</script>
<template>
    <div class="max-h-36 overflow-y-auto">
        <div v-if="isFetching" class="flex items-center justify-center py-3 text-gray-400">
            <icon icon="eos-icons:loading" width="30" height="30" />
        </div>
        <div v-else-if="error" class="text-center">
            <p class="text-xs text-red-600 py-1">There is an error on fetching user list</p>
        </div>
        <template v-else-if="users.length > 0">
            <AppUserDropdownItem
                v-for="user in users"
                :key="user.id"
                :name="user.name"
                :avatar="user.avatar?.['thumb-60']"
                @on-select="$emit('on-select', user)"
            />
        </template>
        <div v-else-if="hasSearch" class="text-sm text-gray-600 text-center">
            <p class="py-2">No user found!</p>
        </div>
    </div>
</template>