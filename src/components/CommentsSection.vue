<script setup lang="ts">
import CommentItem from './CommentItem.vue';
import CommentForm from './forms/CommentForm.vue';

</script>

<template>
     <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">Comments (3)</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Latest activity 2h ago</span>
        </div>
        <!-- New Comment Input -->
        <div class="mb-8">
          <CommentForm class="flex gap-4"/>
        </div>
        <div class="space-y-6">
            <CommentItem/>
            <CommentItem/>
        </div>
    </div>
</template>