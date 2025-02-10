import { useRoute, useRouter } from "vue-router";

export function useUtil() {
    const router = useRouter();
    const route = useRoute();
    const getPageNumber = (pageUrl) => {
        if (!pageUrl || typeof pageUrl !== 'string') return null;

        const params = new URLSearchParams(new URL(pageUrl).search);
        const page = params?.get('page');
        return page ? page : false;
    }
    
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

    const capWords = (str) => {
        if (typeof str !== 'string' || !str.trim()) return '';
        return str.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    } 

    return {
        getPageNumber,
        capWords,
        updateRouteParams,
        replaceParams
    }
}