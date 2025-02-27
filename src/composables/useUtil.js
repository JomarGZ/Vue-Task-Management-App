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

export const snakeCaseWord = (words) => {
    if (!words) return '';
    return words.toLowerCase().replace(/\s+/g, "_");
}


export const handleAsyncRequestOperation = async (operation, onSuccess, loadingState, errorState, onError = null) => {
    if (loadingState.value) return;
    loadingState.value = true;
    errorState.value = false;
    
    try {
        const response = await operation();
        onSuccess(response);
    } catch (error) {
        errorState.value = true;
        if (onError !== null && typeof onError === 'function'){
            onError(error);
        }
        if (error.response?.status !== 422) {
            console.error("Error:", error);
        }
    } finally {
        loadingState.value = false;
    }
};  
export const getMonth = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(dateString)).toUpperCase();
};

export const getDay = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getDate();
};

export const subscribeToChannel = (channelName, eventName, callback) => {
    if (typeof callback !== 'function') {
        console.warn(`Third argument expected to be a function but got ${typeof callback}`);
        return;
    }
    if (!channelName || !eventName) {
        console.error(`Both channelName and eventName are required`);
        return;
    }

    try {
        const channel = window.Echo.channel(channelName); 
        channel.listen(eventName, (event) => {
            callback(event);
        });

        return () => {
            channel.stopListening(eventName);
        };
    } catch (error) {
        console.error('Failed to subscribe to channel:', error);
    }
};



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