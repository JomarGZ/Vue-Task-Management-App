
export function useFormatters() {
    const formatDateWithTime = (date) => {
        return date;
    };

    const formatDateOnly = (date) => {
        return date
    }

    return {
        formatDateWithTime,
        formatDateOnly
    }
}