import { format, formatDistance, parseISO, subDays } from "date-fns";

export const formatDateWithTime = (date) => {
    if (!date) return ;
    return format(new Date(parseISO(date)), "MMMM dd, yyyy hh:mm a");
};
export const formatDateDistance = (date) => {
    if (!date) return;
    return formatDistance(new Date(parseISO(date)), new Date(), { addSuffix: true });
}

export const formatDateOnly = (date) => {
    if (!date) return;
    return format(new Date(parseISO(date)), "MM/dd/yyyy");
}
export const getInitials  = (word) => {
    if (!word) return;
    const splitWords = word.trim().split(' ').filter(word => word.length > 0);
    if (splitWords.length > 1) {
        return splitWords.map(word => word[0].toUpperCase()).join("");
    } else if (splitWords.length === 1) {
        return splitWords.map(word => word[0].toUpperCase() + (word[1] ? word[1].toUpperCase() : "")).join("");
    }
}

 