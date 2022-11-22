import { useEffect } from "react";
import { Location, LocationType } from "../data/Location";

const BookingDetail = ({
    location_start,
    location_end,
    date,
} : {
    location_start: number;
    location_end: number;
    date: number;
}) => {

    return (
        <div>
            {Location.at(location_start - 1)?.Location}
            <br />
            {Location.at(location_end - 1)?.Location}
            <br />
            {
                new Date(date).toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                }) + " น."
            }
        </div>
    )
}

export default BookingDetail;