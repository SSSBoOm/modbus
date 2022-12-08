import axios from "axios";
import { useEffect } from "react";
import { Location, LocationType } from "../data/Location";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
        if (localStorage.getItem("accessToken") != null) {
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
                    if (result.status === 200) {
                        MySwal.fire({
                            title: <p>จองสำเร็จ</p>,
                            icon: "success",
                            confirmButtonText: '<a href="/">OK</a>',
                        });
                    }
                    // console.log(result.data);
                })
                .catch((error) => {
                    // console.log(error);
                });
        } else {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
    }, []);

    return (
        <div className="flex justify-center m-4">
            <div className="py-6 px-12 rounded-3xl bg-blue-400 w-full lg:w-3/4 xl:w-2/4">
                <div className="flex justify-center">
                    <div className="px-6 py-3 text-center md:text-2xl text-xl text-white">
                        ยืนยันข้อมูล
                    </div>
                </div>
                <div className="sm:flex sm:justify-center flex-wrap mt-2 w-full">
                    <div className="pb-2 sm:py-0 sm:mr-2 rounded-3xl w-full sm:w-4/5 bg-white">
                        <div className="text-center text-lg p-4 bg-yellow-400 rounded-t-3xl">
                            ชื่อผู้ใช้งาน
                        </div>
                        <div className="text-center text-lg p-4 bg-white">
                            {localStorage.getItem("username")}
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400">
                            ชื่อ&nbsp;นามสกุล
                        </div>
                        <div className="text-center text-lg p-4 bg-white">
                            {localStorage.getItem("name")}&nbsp;
                            {localStorage.getItem("surname")}
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400">
                            ต้นทาง
                        </div>
                        <div className="text-center text-lg p-4 bg-white">
                            {Location.at(location_start - 1)?.Location}
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400">
                            ปลายทาง
                        </div>
                        <div className="text-center text-lg p-4 bg-white">
                            {Location.at(location_end - 1)?.Location}
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400">
                            เวลา
                        </div>
                        <div className="text-center text-lg p-4 bg-white rounded-b-3xl">
                            {new Date(date).toLocaleDateString("th-TH", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            }) + " น."}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="font-semibold font-heading lg:p-3 lg:w-24 w-20 p-2 rounded-lg bg-green-300 border-2 border-green-300 hover:bg-white"
                        onClick={onBookingSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
