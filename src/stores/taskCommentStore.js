import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskComments = defineStore("task-comments", () => {
    const comments = ref([
         {
            id: 1,
            content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
            author: {
                id: 1,
                name: 'John Doe'
            },
            created_at: '2025-05-10 09:46:40'
        },
        {
            id: 2,
            content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
            author: {
                id: 2,
                name: 'John Doe'
            },
            created_at: '2025-05-10 09:46:40'
        },
          
    ]);
    const moreComments = ref([
          {
                id: 3,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 4,
            content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 5,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 6,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 7,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 8,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 9,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 10,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 11,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
            {
                id: 12,
                content: "I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback",
                author: {
                    id: 1,
                    name: 'John Doe'
                },
                created_at: '2025-05-10 09:46:40'
            },
    ]);
    const loadMore = () => {
        comments.value = [...comments.value, ...moreComments.value]
    }
    return {
        comments,
        loadMore
    }
});