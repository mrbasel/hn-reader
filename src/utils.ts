import { formatDistance } from "date-fns";

export function findTimePassed(unixTime: number): String {
    const baseDate = new Date(unixTime * 1000);
    const currentDate = new Date();

    return formatDistance(currentDate, baseDate).replaceAll("about", "") + " ago";
}