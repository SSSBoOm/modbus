import axios from "axios";
import { useState, useEffect } from "react";
import BookingDetail from "../components/BookingDetail";
import BookingSelectTime from "../components/BookingSelectTime";
import Path from "../components/Path";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Login from "../components/Login";

const MySwal = withReactContent(Swal);

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

    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
    }, [localStorage.getItem("accessToken")]);

    return (
        <div className="p-10">
            {open ? (
                <>
                    <Login obj={open} setObj={setOpen} ModalOn="/" />
                </>
            ) : (
                <></>
            )}
            <div className="border-2 border-yellow-200 bg-yellow-100 p-6 rounded-2xl">
                <div className="flex justify-between px-4">
                    {/* Button Previos */}
                    {openTab !== 1 ? (
                        <button
                            className="md:p-3 md:w-24 w-20 p-2 md:text-base text-sm rounded-xl bg-slate-300"
                            onClick={() => {
                                if (
                                    localStorage.getItem("accessToken") == null
                                ) {
                                    setOpen(true);
                                } else {
                                    if (openTab === 2) {
                                        setOpenTab(1);
                                    } else if (openTab === 3) {
                                        setOpenTab(2);
                                    }
                                }
                            }}
                        >
                            Previous
                        </button>
                    ) : (
                        <a></a>
                    )}
                    {/* Button Next */}
                    {openTab !== 3 ? (
                        <button
                            className="md:p-3 md:w-24 w-20 p-2 md:text-base text-sm rounded-xl bg-slate-300"
                            onClick={() => {
                                if (
                                    localStorage.getItem("accessToken") == null
                                ) {
                                    setOpen(true);
                                } else {
                                    if (openTab === 1) {
                                        if (
                                            location_start !== 0 &&
                                            location_end !== 0
                                        ) {
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
                                }
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        <a></a>
                    )}
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
                            setDateSelect={setDateSelect}
                            setOpenTap={setOpenTab}
                            routePath={routePath}
                            round_id={selectround_id}
                            setRound_id={setSelectround_id}
                            setOpen={setOpen}
                        />
                    </>
                ) : (
                    <></>
                )}
                {openTab === 3 ? (
                    <>
                        <BookingDetail
                            round_id={selectround_id}
                            location_start={location_start}
                            location_end={location_end}
                            date={dateSelect}
                            setOpen={setOpen}
                        />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Booking;
