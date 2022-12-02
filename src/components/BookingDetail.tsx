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
            <div className="p-12 rounded-3xl bg-gray-50">
                <div className="flex justify-center">
                    <div className="px-6 py-3 text-center bg-white border-2 border-red-200 rounded-full">
                        ยืนยันข้อมูล
                    </div>
                </div>
                <div className="md:flex hidden w-4/5 sm:w-full justify-between">
                    <div className="md:px-12 md:py-12">
                        <div className="flex justify-center">
                            <a className="mx-2 w-44 px-4">ชื่อผู้ใช้งาน</a>
                            <a className="mx-2 w-44 px-4">ชื่อ&nbsp;นามสกุล</a>
                        </div>
                        <div className="flex justify-center mb-4">
                            <a className="m-2 w-44 px-4 py-2 bg-white border-2 border-red-200 rounded-xl">
                                {localStorage.getItem("username")}
                            </a>
                            <a className="m-2 w-44 px-4 py-2 bg-white border-2 border-red-200 rounded-xl">
                                {localStorage.getItem("name")}&nbsp;
                                {localStorage.getItem("surname")}
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a className="mx-2 w-44 px-4">ต้นทาง</a>
                            <a className="mx-2 w-44 px-4">ปลายทาง</a>
                        </div>
                        <div className="flex justify-center mb-4">
                            <a className="m-2 w-44 px-4 py-2 bg-white border-2 border-red-200 rounded-xl">
                                {Location.at(location_start - 1)?.Location}
                            </a>
                            <a className="m-2 w-44 px-4 py-2 bg-white border-2 border-red-200 rounded-xl">
                                {Location.at(location_end - 1)?.Location}
                            </a>
                        </div>
                        <div className="flex justify-start">
                            <a className="mx-2 px-10">เวลา</a>
                        </div>
                        <div className="flex justify-center mb-4">
                            <a className="m-2 w-80 px-4 py-2 bg-white border-2 border-red-200 rounded-xl">
                                {new Date(date).toLocaleDateString("th-TH", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: false,
                                }) + " น."}
                            </a>
                        </div>
                        <div className="flex justify-center m-2">
                            <button
                                className="font-semibold font-heading md:p-3 md:w-24 w-20 p-2 rounded-md bg-green-300 border-2 border-green-300 hover:bg-white"
                                onClick={onBookingSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:hidden sm:w-full">
                    <div className="inline m-1">
                        <div className="mx-2">ชื่อผู้ใช้งาน</div>
                        <div className="w-44 my-2 px-2 py-2 bg-white border-2 border-red-200 rounded-xl">
                            {localStorage.getItem("username")}
                        </div>
                        <div className="mx-2">ชื่อ&nbsp;นามสกุล</div>
                        <div className="w-44 my-2 px-2 py-2 bg-white border-2 border-red-200 rounded-xl">
                            {localStorage.getItem("name")}&nbsp;
                            {localStorage.getItem("surname")}
                        </div>
                        <div className="mx-2">ต้นทาง</div>
                        <div className="w-44 my-2 px-2 py-2 bg-white border-2 border-red-200 rounded-xl">
                            {Location.at(location_start - 1)?.Location}
                        </div>
                        <div className="mx-2">ปลายทาง</div>
                        <div className="w-44 my-2 px-2 py-2 bg-white border-2 border-red-200 rounded-xl">
                            {Location.at(location_end - 1)?.Location}
                        </div>
                        <div className="mx-2">เวลา</div>
                        <div className="w-44 my-2 px-2 py-2 bg-white border-2 border-red-200 rounded-xl">
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
                        <div className="flex justify-center mt-4">
                        <button
                            className="font-semibold font-heading md:p-3 md:w-24 w-20 p-2 rounded-md bg-green-300 border-2 border-green-300 hover:bg-white"
                            onClick={onBookingSubmit}
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
