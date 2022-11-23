import { useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
type TypeRoutePath = {
    bus_id: number;
    location_start: number;
    location_end: number;
    round_id: number;
    time_start: number;
}[];

const BookingSelectTime = ({
    setOpen,
    routePath,
    round_id,
    setRound_id,
    setDateSelect,
}: {
    setOpen: React.Dispatch<React.SetStateAction<number>>;
    routePath: TypeRoutePath;
    round_id: number;
    setRound_id: React.Dispatch<React.SetStateAction<number>>;
    setDateSelect: React.Dispatch<React.SetStateAction<number>>;
}) => {
    useEffect(() => {
        if (routePath.length === 0) {
            setOpen(1);
            MySwal.fire({
                title: <p>ไม่พบเส้นทาง</p>,
                text: "กรุณาเลือกเส้นทางใหม่อีกครั้ง",
                icon: "error",
            });
        }
    }, []);
    return (
        <div className="">
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    วันเวลา
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    {routePath.map((e) => {
                        return (
                            <div>
                                <FormControlLabel
                                    checked={round_id === e.round_id}
                                    value={e.round_id}
                                    control={<Radio />}
                                    label={
                                        new Date(e.time_start).toLocaleDateString("th-TH", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: false,
                                        }) + " น."
                                    }
                                    onClick={(event) => {
                                        setDateSelect(
                                            e.time_start
                                        )
                                        setRound_id(
                                            parseInt(
                                                (event.target as HTMLInputElement)
                                                    .value
                                            )
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default BookingSelectTime;
