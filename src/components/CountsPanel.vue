<script setup>
import CountCard from "@/components/CountCard.vue";

</script>
<template>
     <div class="grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mb-4">
        <CountCard title="Task Completed" :count="0" icon="line-md:star"/>
        <CountCard title="New Task" :count="0" icon="streamline:task-list"/>
        <CountCard title="Project Done" :count="0" icon="fluent:clipboard-task-list-16-regular" />
    </div>
</template>