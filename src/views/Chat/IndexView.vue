<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
</script>

<template>
      <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
        <ChatGroupSection/>
        <ChatMainSection/>
        <ChatMembersSection/>
    </div>
</template>