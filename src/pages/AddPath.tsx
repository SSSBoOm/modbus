import React from "react";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { Location, LocationType } from "../data/Location";
import axios from "axios";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const MySwal = withReactContent(Swal);

interface TypeBusList {
    id: number;
    bus_id: string;
    bus_type: number;
}

const AddPath = () => {
    const [location_start, setLocation_start] = React.useState<number>(0);
    const [location_end, setLocation_end] = React.useState<number>(0);
    const [busSelect, setBusSelect] = React.useState<number>(0);
    const [datetime, setDatetime] = React.useState<Dayjs | null>();

    const [bus, setBus] = React.useState<TypeBusList[]>([]);

    const onSubmit = () => {
        axios
            .post(
                "https://api.modbus.sleepyboi.space/api/create/round",
                {
                    time_start: datetime,
                    bus_id: busSelect,
                    location_start: location_start,
                    location_end: location_end,
                },
                {
                    headers: {
                        "access-token": localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((result) => {
                console.log(result);
                if (result.status === 200) {
                    MySwal.fire({
                        title: <p>เพิ่มรอบสำเร็จ</p>,
                        icon: "success",
                        confirmButtonText: "OK",
                        preConfirm: () => {
                            return (window.location.href = "/");
                        },
                        allowOutsideClick: false,
                    });
                }
            });
    };

    React.useEffect(() => {
        axios
            .get("https://api.modbus.sleepyboi.space/api/get/bus")
            .then((result) => {
                setBus(result.data);
            });
    }, []);

    return (
        <div className="flex justify-center m-4">
            <div className="py-6 px-12 rounded-3xl bg-blue-400 w-full lg:w-3/4 xl:w-2/4">
                <div className="flex justify-center">
                    <div className="px-6 py-3 text-center md:text-2xl text-xl text-white">
                        เพิ่มรอบการเดินรถ
                    </div>
                </div>
                <div className="sm:flex sm:justify-center flex-wrap mt-2 w-full">
                    <div className="pb-2 sm:py-0 sm:mr-2 rounded-3xl w-full sm:w-4/5 bg-white">
                        <div className="text-center text-lg p-4 bg-yellow-400 rounded-t-3xl w-full">
                            สถานีต้นทาง
                        </div>
                        <div className="sm:px-12 px-4 mt-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    ต้นทาง
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={0}
                                    value={location_start}
                                    label="ต้นทาง"
                                    onChange={(event) => {
                                        setLocation_start(
                                            event.target.value as number
                                        );
                                    }}
                                >
                                    {Location.map((e: LocationType) => {
                                        return e.LId !== location_end ? (
                                            <MenuItem value={e.LId}>
                                                {e.Location}
                                            </MenuItem>
                                        ) : null;
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400 w-full">
                            สถานีปลายทาง
                        </div>
                        <div className="sm:px-12 px-4 mt-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    ปลายทาง
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={location_end}
                                    label="ปลายทาง"
                                    onChange={(event) => {
                                        setLocation_end(
                                            event.target.value as number
                                        );
                                    }}
                                >
                                    {Location.map((e: LocationType) => {
                                        return e.LId !== location_start ? (
                                            <MenuItem value={e.LId}>
                                                {e.Location}
                                            </MenuItem>
                                        ) : null;
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400 w-full">
                            หมายเลยทะเบียนรถ
                        </div>
                        <div className="sm:px-12 px-4 mt-2 mb-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    ทะเบียน
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={busSelect}
                                    label="ทะเบียน"
                                    onChange={(event) => {
                                        setBusSelect(
                                            event.target.value as number
                                        );
                                    }}
                                >
                                    {bus.map((e: TypeBusList) => {
                                        return (
                                            <MenuItem value={e.id}>
                                                {e.bus_id}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="text-center text-lg p-4 bg-yellow-400 w-full">
                            วัน
                        </div>
                        <div className="sm:px-12 px-4 mt-2 mb-2">
                            <FormControl fullWidth>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        label="Basic example"
                                        value={datetime}
                                        onChange={(newDate) => {
                                            setDatetime(newDate);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="font-semibold font-heading lg:p-3 lg:w-24 w-20 p-2 rounded-lg bg-green-300 border-2 border-green-300 hover:bg-white"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPath;
