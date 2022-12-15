import axios from "axios";
import React, { useState, useEffect } from "react";
import BookingDetail from "../components/BookingDetail";
import BookingSelectTime from "../components/BookingSelectTime";
import Path from "../components/Path";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Login from "../components/Login";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
} from "@mui/material";

const MySwal = withReactContent(Swal);

const steps = [
    "Select Location",
    "Select Time",
    "Confirm Booking",
];

type TypeRoutePath = {
    bus_id: number;
    location_start: number;
    location_end: number;
    round_id: number;
    time_start: number;
}[];

const Booking = () => {
    const [dateSelect, setDateSelect] = useState<number>(1);
    const [change, setChange] = useState<boolean>(false);
    const [location_start, setLocation_start] = useState<number>(0);
    const [location_end, setLocation_end] = useState<number>(0);
    const [selectround_id, setSelectround_id] = useState<number>(0);
    const [routePath, setRoutePath] = useState<TypeRoutePath>([]);

    const [open, setOpen] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        axios
            .get(
                `https://api.modbus.sleepyboi.space/api/get/round/${location_start}/${location_end}`,
                {}
            )
            .then((res) => {
                setRoutePath(res.data);
                setChange(false);
                setSelectround_id(0);
            });
    }, [change]);

    const handleNext = () => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken") == null) {
            setOpen(true);
        }
    }, [localStorage.getItem("accessToken")]);

    return (
        <div className="">
            {open ? (
                <>
                    <Login obj={open} setObj={setOpen} ModalOn="/" />
                </>
            ) : (
                <></>
            )}
            <div className="p-6 rounded-2xl">
                <div className="flex justify-center p-6">
                    <div className="">
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
                {activeStep === 0 ? (
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
                {activeStep === 1 ? (
                    <>
                        <BookingSelectTime
                            OpenTap={activeStep}
                            setOpenTap={setActiveStep}
                            setDateSelect={setDateSelect}
                            routePath={routePath}
                            round_id={selectround_id}
                            setRound_id={setSelectround_id}
                            setOpen={setOpen}
                        />
                    </>
                ) : (
                    <></>
                )}
                {activeStep === 2 ? (
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
                <div className="flex justify-center">
                    <div className="lg:w-9/12 xl:w-6/12 w-full p-2">
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1
                                    ? null
                                    : "Next"}
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
