import { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
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
    setOpenTap,
    routePath,
    round_id,
    setRound_id,
    setDateSelect,
    setOpen,
}: {
    setOpenTap: React.Dispatch<React.SetStateAction<number>>;
    routePath: TypeRoutePath;
    round_id: number;
    setRound_id: React.Dispatch<React.SetStateAction<number>>;
    setDateSelect: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    useEffect(() => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }

        if (routePath.length === 0) {
            setOpenTap(1);
            MySwal.fire({
                title: <p>ไม่พบเส้นทาง</p>,
                text: "กรุณาเลือกเส้นทางใหม่อีกครั้ง",
                icon: "error",
                allowOutsideClick: false
            });
        }
    }, []);
    return (
        <div className="flex justify-center m-4">
            <div className="py-6 px-12 rounded-3xl bg-blue-400 w-full lg:w-3/4 xl:w-2/4">
                <div className="flex justify-center">
                    <div className="px-6 py-3 text-center md:text-2xl text-xl text-white">
                        เลือกรอบการเดินรถ
                    </div>
                </div>
                <div className="sm:flex sm:justify-center flex-wrap mt-2 w-full">
                    <div className="pb-2 sm:py-0 sm:mr-2 rounded-3xl w-full sm:w-4/5 bg-white">
                        <div className="text-center text-lg p-4 bg-yellow-400 rounded-t-3xl w-full">
                            วัน - เวลา
                        </div>
                        <div className="sm:px-12 px-4 mt-2 mb-2">
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    {routePath.map((e) => {
                                        return (
                                            <div>
                                                <FormControlLabel
                                                    checked={
                                                        round_id === e.round_id
                                                    }
                                                    value={e.round_id}
                                                    control={<Radio />}
                                                    label={
                                                        new Date(
                                                            e.time_start
                                                        ).toLocaleDateString(
                                                            "th-TH",
                                                            {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                hour12: false,
                                                            }
                                                        ) + " น."
                                                    }
                                                    onClick={(event) => {
                                                        setDateSelect(
                                                            e.time_start
                                                        );
                                                        setRound_id(
                                                            parseInt(
                                                                (
                                                                    event.target as HTMLInputElement
                                                                ).value
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSelectTime;
