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
            <div className="md:inline hidden m-2 w-2/5">
                <Card align="center" size="lg" variant="outline">
                    <CardHeader>
                        <Heading size="md">{DateTime()}</Heading>
                    </CardHeader>
                    <CardBody className="w-full">
                        <div className="w-full">
                            <div className="p-2 border-2 rounded-xl mb-4">
                                <div className="flex justify-center mb-2">
                                    <a className="p-2 m-1 border-2 rounded-xl bg-amber-200">
                                        ข้อมูลเส้นทาง
                                    </a>
                                </div>
                                <div className="p-2 flex justify-center">
                                    <div className="">
                                        <div>
                                            เดินทางจาก &nbsp;
                                            {location_start_name}
                                        </div>
                                        <div>
                                            ไปยัง &nbsp;
                                            {location_end_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 border-2 rounded-xl m">
                                <div className="flex justify-center mb-2">
                                    <a className="p-2 m-1 border-2 rounded-xl bg-amber-200">
                                        ข้อมูลรถโดยสาร
                                    </a>
                                </div>
                                <div className="flex justify-center">
                                    หมายเลยทะเบียน &nbsp;{bus_id}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="w-full flex justify-start">
                        <Button onClick={onCancel} colorScheme="red">
                            ยกเลิก
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="md:hidden m-2 w-10/12">
                <Card align="center" size="md" variant="outline">
                    <CardHeader>
                        <Heading size="sm">{DateTime()}</Heading>
                    </CardHeader>
                    <CardBody>
                        {booking_ID}
                        เดินทางจาก&nbsp;
                        {location_start_name}
                        ไป&nbsp;
                        {location_end_name}&nbsp;
                        {bus_id}
                    </CardBody>
                    <CardFooter className="w-full flex justify-start">
                        <Button onClick={onCancel} size="sm" colorScheme="red">
                            ยกเลิก
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ListBox;
