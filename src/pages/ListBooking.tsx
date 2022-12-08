import axios from "axios";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ListBox from "../components/ListBox";
import Login from "../components/Login";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type BookingsType = {
    id: number;
    student_id: number;
    round_id: number;
    round_name: {
        bus_id: number;
        bus_name: {
            id: number;
            bus_id: string;
            bus_type: number;
        };
        location_end: number;
        location_end_name: {
            id: number;
            name: string;
        };
        location_start: number;
        location_start_name: {
            id: number;
            name: string;
        };
        time_start: string;
    };
}[];

const ListBooking = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [listbook, setListBook] = useState<BookingsType>([]);

    useEffect(() => {
        if(localStorage.getItem("accessToken") !== null) {
            axios
                .get(`https://api.modbus.sleepyboi.space/api/get/booking`, {
                    headers: {
                        "access-token": localStorage.getItem("accessToken"),
                    },
                })
                .then((result) => {
                    setListBook(result.data);
                });
        }
        else {
            setOpen(true);
        }
    }, []);

    return (
        <ChakraProvider>
            {open ? (
                <>
                    <Login obj={open} setObj={setOpen} ModalOn="/" />
                </>
            ) : (
                <></>
            )}
            <div className="">
                <div className="text-center py-6 mt-4">
                    <a className="md:text-2xl text-xl p-4 rounded-xl bg-yellow-400 border-yellow-400 border-2">ประวัติการจอง</a>
                </div>
                {listbook.map((data, index) => {
                    return (
                        <div className="flex justify-center">
                            <ListBox
                                booking_ID={data.id}
                                location_start_name={
                                    data.round_name.location_start_name.name
                                }
                                location_end_name={
                                    data.round_name.location_end_name.name
                                }
                                time_start={data.round_name.time_start}
                                bus_id={data.round_name.bus_name.bus_id}
                                bus_type={data.round_name.bus_name.bus_type}
                                status={true}
                            />
                        </div>
                    );
                })}
            </div>
        </ChakraProvider>
    );
};

export default ListBooking;
