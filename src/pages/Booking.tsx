import { warning } from "@remix-run/router";
import axios from "axios";
import { useState, useEffect } from "react";
import BookingDetail from "../components/BookingDetail";
import BookingSelectTime from "../components/BookingSelectTime";
import Path from "../components/Path";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

type TypeRoutePath = {
    bus_id: number;
    location_start: number;
    location_end: number;
    round_id: number;
    time_start: number;
}[];

const Booking = () => {
    const [openTab, setOpenTab] = useState<number>(1);
    const [dateSelect, setDateSelect] = useState<number>(1);
    const [change, setChange] = useState<boolean>(false);
    const [location_start, setLocation_start] = useState<number>(0);
    const [location_end, setLocation_end] = useState<number>(0);
    const [selectround_id, setSelectround_id] = useState<number>(0);
    const [routePath, setRoutePath] = useState<TypeRoutePath>([]);

    const onLoadPath = () => {
        axios
            .get(
                `https://api.modbus.sleepyboi.space/api/get/round/${location_start}/${location_end}`,
                {}
            )
            .then((res) => {
                setRoutePath(res.data);
                setChange(false);
                setSelectround_id(0);
                setOpenTab(2);
            });
    };

    return (
        <div className="p-10">
            <div className="flex justify-between border-2 border-yellow-200 bg-yellow-100 p-5 rounded-full">
                {/* Button Previos */}
                <button
                    className="rounded-xl p-2 bg-slate-300"
                    onClick={() => {
                        if (openTab === 2) {
                            setOpenTab(1);
                        } else if (openTab === 3) {
                            setOpenTab(2);
                        }
                    }}
                >
                    Previous
                </button>
                {/* Button Next */}
                <button
                    className="rounded-xl p-2 bg-slate-300"
                    onClick={() => {
                        if (openTab === 1) {
                            if (location_start !== 0 && location_end !== 0) {
                                if (change) {
                                    onLoadPath();
                                } else {
                                    setOpenTab(2);
                                }
                            } else {
                                MySwal.fire({
                                    title: <p>โปรดเลือกเส้นทาง</p>,
                                    icon: "error",
                                  });
                            }
                        } else if (openTab === 2) {
                            if (selectround_id !== 0) {
                                setOpenTab(3);
                            } else {
                                MySwal.fire({
                                    title: <p>โปรดเลือกช่วงเวลา</p>,
                                    icon: "error",
                                  });
                            }
                        }
                    }}
                >
                    Next
                </button>
            </div>
            {openTab === 1 ? (
                <>
                    <Path
                        change={change}
                        setChange={setChange}
                        obj_start={location_start}
                        setObj_start={setLocation_start}
                        obj_end={location_end}
                        setObj_end={setLocation_end}
                    />
                </>
            ) : (
                <></>
            )}
            {openTab === 2 ? (
                <>
                    <BookingSelectTime
                        dateSelect={dateSelect}
                        setDateSelect={setDateSelect}
                        setOpen={setOpenTab}
                        routePath={routePath}
                        round_id={selectround_id}
                        setRound_id={setSelectround_id}
                    />
                </>
            ) : (
                <></>
            )}
            {openTab === 3 ? (
                <>
                    <BookingDetail
                        location_start={location_start}
                        location_end={location_end}
                        date={dateSelect}
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Booking;
