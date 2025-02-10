import { useRoute, useRouter } from "vue-router";

export const getPageNumber = (pageUrl) => {
    if (!pageUrl || typeof pageUrl !== "string") return null;
    try {
        const params = new URLSearchParams(new URL(pageUrl).search);
        return params.get("page") || null;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
};

export const capWords = (str) => {
    if (typeof str !== 'string' || !str.trim()) return '';
    return str.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
} 

export function useUtil() {
    const router = useRouter();
    const route = useRoute();
    
    const updateRouteParams = (params) => {
        if (typeof params !== 'object' || Array.isArray(params) || params === null) {
            console.warn('Invalid params: Expected an Object');
            return Promise.resolve();
        }
        return router.push({
            query: {
                ...route.query,
                ...params
            }
        })
    }
    
    const replaceParams = (newParams) => {
        if (typeof newParams !== 'object' || Array.isArray(newParams) || newParams === null) {
            console.warn('Invalid newParams: Expected an Object');
            return Promise.resolve();
        }
        return router.replace({
            query: newParams ? newParams : {} 
        })
    }

    return {
        updateRouteParams,
        replaceParams
    }
}