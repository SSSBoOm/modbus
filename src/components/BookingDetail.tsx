import axios from "axios";
import { useEffect } from "react";
import { Location, LocationType } from "../data/Location";

const BookingDetail = ({
    round_id,
    location_start,
    location_end,
    date,
    setOpen,
}: {
    round_id: number;
    location_start: number;
    location_end: number;
    date: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const onBookingSubmit = () => {
        axios
            .post(
                `https://api.modbus.sleepyboi.space/api/booking/${round_id}`,
                {},
                {
                    headers: {
                        "access-token": localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((result) => {
                console.log(result.data);
            });
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
    }, []);

    return (
        <div className="flex justify-center m-4">
            <div className="p-12 rounded-3xl bg-gray-200">
                {round_id}
                <br />
                {Location.at(location_start - 1)?.Location}
                <br />
                {Location.at(location_end - 1)?.Location}
                <br />
                {new Date(date).toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                }) + " น."}
                <br />
                <button onClick={onBookingSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default BookingDetail;
