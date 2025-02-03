import { format, parseISO } from "date-fns";

export function useFormatters() {
    const formatDateWithTime = (date) => {
        return date;
    };

    const formatDateOnly = (date) => {
        if (!date) return;
        return format(new Date(parseISO(date)), "MM/dd/yyyy");
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