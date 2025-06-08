<script setup>
import { Icon } from '@iconify/vue';
import ChatMemberItem from './ChatMemberItem.vue';
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce';
defineProps({
    participants: {
        type: Object,
        default: () => ({data: []})
    },
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    },
    hasMore: {
        type: Boolean,
        default: false
    }
})
const query = ref('');
const emit = defineEmits(['load-more', 'on-search']);
const searchDebounce = debounce((query) => {
    emit('on-search', {query : query})
}, 300);

watch(query, searchDebounce);
</script>

<template>
    <div class="w-80 bg-white border-l border-gray-200 hidden lg:flex flex-col">
        <div class="p-4 border-b border-gray-200">
            <h2 class="font-semibold flex items-center">
                <Icon icon="fluent-color:people-32" width="32" height="32" />
                Team Members
            </h2>
            <div class="relative mt-2">
                <input type="text" v-model="query"  placeholder="Search members..." class="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-100">
                <Icon class="absolute left-3 top-2" icon="flat-color-icons:search" width="25" height="25" />
            </div>
        </div>
        
        <div class="flex-1 overflow-y-auto">
            <!-- Online Members -->
            <div class="p-3">
                <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online — 5
                </h3>
                <ul  
                    >
                    <ChatMemberItem  
                        v-for="participant in participants.data"
                        :key="participant?.id"
                        :position="participant?.position"
                        :name="participant?.name"
                        :avatar="participant.avatar?.['thumb-60']"
                    />
                    <li v-if="isFetching" class="flex items-center justify-center">
                        <Icon icon="eos-icons:three-dots-loading" width="100%" height="40" />
                    </li>
                    <li v-else-if="hasMore" class="flex items-center justify-center"><button @click="$emit('load-more')" class="hover:bg-sky-100 w-full py-2 cursor-pointer">Load More</button></li>
                    <li v-else class="text-center">No more items to load</li>
                  
                </ul>
            </div>
        </div>
        <div class="p-4 border-t border-gray-200">
            <button class="w-full bg-primary-50 text-primary-600 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-primary-100 transition-colors">
                <i class="fas fa-user-plus mr-2"></i>
                Invite Team Members
            </button>
        </div>
    </div>
</template>