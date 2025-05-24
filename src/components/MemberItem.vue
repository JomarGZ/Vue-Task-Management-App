<script setup>
import { Icon } from '@iconify/vue';
import UserAvatar from './UserAvatar.vue';
import { useAuth } from '@/stores/auth';
import { computed, ref, watch } from 'vue';
import { getPositionByValue, getPositionsOption } from '@/constants/user';

const props = defineProps({
    id: {
        type: [Number, String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: ''
    },
})
const selectedPosition = ref('');
const emit = defineEmits(['save-member', 'delete-member']);

watch(selectedPosition, (position) => {
    if (position) {
        emit('save-member', position)
    }
})
const positionConfig = computed(() => props.position ? getPositionByValue(props.position) : {});
const auth = useAuth();
</script>
<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <UserAvatar :avatar="avatar" :name="name"/>
                </div>
                <div class="ml-4 min-w-0 max-w-[200px]">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ name }}</div>
                    <div class="text-sm text-secondary truncate">{{ email }}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span 
                class="px-2 py-1 text-xs font-medium rounded-full text-gray-600"
                :class="positionConfig.badgeClass"
            >{{ positionConfig.label || 'Not set' }}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" v-if="auth.user?.role === 'admin'">
            <div class="relative">
                <select v-model="selectedPosition" class="block w-full cursor-pointer hover:bg-gray-100 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
                    <option value="" selected disabled>Select new Position</option>
                    <option 
                        v-for="position in getPositionsOption()"
                        :key="position.value"
                        :value="position.value"
                    >{{ position.label }}</option>
                </select>
            </div>
        </td>
        <!-- <td class="px-6 py-4">
            <div class="flex flex-wrap gap-1">
                <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Figma</span>
                <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Sketch</span>
                <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Adobe XD</span>
            </div>
        </td> -->
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex">
            <RouterLink :to="{name: 'members.show', params: {id: id}}" class="text-green-600 hover:text-green-900 hover:bg-green-100 flex items-center justify-center p-1 rounded-md">
                <Icon icon="lets-icons:view" width="24" height="24" />
            </RouterLink>
            <button @click="$emit('delete-member',id)" v-if="auth.user?.role === 'admin'" class="text-primary cursor-pointer hover:text-primary/80 mr-3 text-red-600 hover:text-red-900 rounded-md p-1 hover:bg-red-100" title="Delete member">
                <Icon icon="mi:delete" width="24" height="24" />
            </button>
        </td>
    </tr>
</template>