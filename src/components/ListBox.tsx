import {
    Heading,
    Text,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ListBox = ({
    booking_ID,
    location_start_name,
    location_end_name,
    time_start,
    bus_id,
    bus_type,
    status,
}: {
    booking_ID: number;
    location_start_name: string;
    location_end_name: string;
    time_start: string;
    bus_id: string;
    bus_type: number;
    status: boolean;
}) => {
    const DateTime = () => {
        return (
            new Date(time_start).toLocaleDateString("th-TH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            }) + " น."
        );
    };
    const DateMB = () => {
        return new Date(time_start).toLocaleDateString("th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    const TimeMB = () => {
        return (
            new Date(time_start).toLocaleTimeString("th-TH", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            }) + " น."
        );
    };

    const onCancel = () => {
        axios
            .post(
                `https://api.modbus.sleepyboi.space/api/cancel/booking/${booking_ID}`,
                {},
                {
                    headers: {
                        "access-token": localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((result) => {
                // console.log(result);
                if (result.status === 200) {
                    MySwal.fire({
                        title: <p>ยกเลิกการจองสำเร็จ</p>,
                        icon: "success",
                        confirmButtonText: '<a href="/">OK</a>',
                    });
                }
            });
    };

    return (
        <div className="flex justify-center container">
            <div className="lg:inline hidden m-4 w-3/5 xl:w-2/5">
                <Card
                    align="center"
                    size="lg"
                    variant="outline"
                    background="blue.400"
                    rounded="2xl"
                >
                    <CardHeader className="">
                        <Heading size="lg" color="white">
                            {DateTime()}
                        </Heading>
                    </CardHeader>
                    <CardBody className="w-full">
                        <div className="w-full">
                            <div className="bg-white rounded-3xl mb-6">
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <div className="text-center rounded-t-3xl pt-3 pb-2 bg-yellow-400 text-xl">
                                            ข้อมูลการเดินทาง
                                        </div>
                                        <div className="p-2">
                                            <div className="text-center">
                                                เดินทางจาก &nbsp;
                                                {location_start_name}
                                            </div>
                                            <div className="text-center">
                                                ปลายทาง &nbsp;
                                                {location_end_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl bg-white">
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <div className="text-center rounded-t-3xl pt-3 pb-2 bg-yellow-400 text-xl">
                                            ข้อมูลรถโดยสาร
                                        </div>
                                        <div className="p-2">
                                            <div className="text-center">
                                                หมายเลยทะเบียน &nbsp;
                                            </div>
                                            <div className="text-center">
                                                {bus_id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button onClick={onCancel} colorScheme="red">
                                    ยกเลิก
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="lg:hidden m-2 w-10/12">
                <Card
                    align="center"
                    size="lg"
                    variant="outline"
                    background="blue.400"
                    rounded="2xl"
                >
                    <CardHeader>
                        <Heading size="sm" color="white">
                            <a className="flex justify-center m-0">{DateMB()}</a>{" "}
                            <br />{" "}
                            <a className="flex justify-center m-0">เวลา {TimeMB()}</a>
                        </Heading>
                    </CardHeader>
                    <CardBody className="w-full">
                        <div className="w-full">
                            <div className="bg-white rounded-3xl mb-6">
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <div className="text-center rounded-t-3xl pt-3 pb-2 bg-yellow-400 text-xl">
                                            ข้อมูลการเดินทาง
                                        </div>
                                        <div className="p-2">
                                            <div className="text-center">
                                                เดินทางจาก &nbsp;
                                                {location_start_name}
                                            </div>
                                            <div className="text-center">
                                                ปลายทาง &nbsp;
                                                {location_end_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl bg-white">
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <div className="text-center rounded-t-3xl pt-3 pb-2 bg-yellow-400 text-xl">
                                            ข้อมูลรถโดยสาร
                                        </div>
                                        <div className="p-2">
                                            <div className="text-center">
                                                หมายเลยทะเบียน &nbsp;
                                            </div>
                                            <div className="text-center">
                                                {bus_id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button onClick={onCancel} colorScheme="red">
                                    ยกเลิก
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ListBox;
