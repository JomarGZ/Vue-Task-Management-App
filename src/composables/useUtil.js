import { useRoute, useRouter } from "vue-router";

export function useUtil() {
    const router = useRouter();
    const route = useRoute();
    const getPageNumber = (pageUrl) => {
        if (!pageUrl) return;

        const params = new URLSearchParams(new URL(pageUrl).search);
        const page = params?.get('page');
        return page ? page : false;
    }
    
    const updateRouteParams = (params = {}) => {
        return router.push({
            query: {
                ...route.query,
                ...params
            }
        })
    } 

    return {
        getPageNumber,
        updateRouteParams
    }
}