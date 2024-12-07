import { format } from "date-fns";

export function useFormatters() {
    const formatDateWithTime = (date) => {
        return format(new Date(date), "MMM d, yyyy h:mm a");
    };

    const formatDateOnly = (date) => {
        return format(new Date(date), 'yyyy-MM-dd')
    }

    return {
        formatDateWithTime,
        formatDateOnly
    }
}