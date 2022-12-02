import axios from "axios";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ListBox from "../components/ListBox";

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
    const [listbook, setListBook] = useState<BookingsType>([]);

    useEffect(() => {
        axios
            .get(`https://api.modbus.sleepyboi.space/api/get/booking`, {
                headers: {
                    "access-token": localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                setListBook(result.data);
                // console.log(result.data);
            });
    }, []);

    return (
        <ChakraProvider>
            <div className="">
                <div className="text-center py-6 mt-2">
                    <a className="md:text-2xl text-xl p-4 rounded-xl bg-amber-200">ประวัติการจอง</a>
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
