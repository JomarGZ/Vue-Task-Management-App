
export function useFormatters() {
    const formatDateWithTime = (date) => {
        return date;
    };

    const formatDateOnly = (date) => {
        return date
    }
    const getInitials  = (word) => {
        if (!word) return;
        const splitWords = word.trim().split(' ').filter(word => word.length > 0);
        if (splitWords.length > 1) {
            return splitWords.map(word => word[0].toUpperCase()).join("");
        } else if (splitWords.length === 1) {
            return splitWords.map(word => word[0].toUpperCase() + (word[1] ? word[1].toUpperCase() : "")).join("");
        }
    }

    return {
        formatDateWithTime,
        formatDateOnly,
        getInitials
    }
}