import * as React from "react";
import { Location, LocationType } from "../data/Location";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";

const Path = ({
    change,
    setChange,
    obj_start,
    setObj_start,
    obj_end,
    setObj_end,
}: {
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    obj_start: number;
    setObj_start: React.Dispatch<React.SetStateAction<number>>;
    obj_end: number;
    setObj_end: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="">
            <div className="flex justify-center m-4">
                <div className="py-6 px-12 rounded-3xl bg-blue-400 w-full lg:w-3/4 xl:w-2/4">
                    <div className="flex justify-center">
                        <div className="px-6 py-3 text-center md:text-2xl text-xl text-white">
                            เลือกเส้นทาง
                        </div>
                    </div>
                    <div className="sm:flex sm:justify-center flex-wrap mt-2 w-full">
                        <div className="pb-2 sm:py-0 sm:mr-2 rounded-3xl w-full sm:w-2/5 bg-white">
                            <div className="text-center text-lg p-4 bg-yellow-400 rounded-t-3xl w-full">
                                ต้นทาง
                            </div>
                            <div className="sm:px-12 px-4 mt-2 mb-2">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        {Location.map((e: LocationType) => {
                                            return (
                                                <div>
                                                    <FormControlLabel
                                                        value={e.LId}
                                                        disabled={
                                                            e.LId === obj_end
                                                        }
                                                        control={<Radio />}
                                                        checked={
                                                            obj_start === e.LId
                                                        }
                                                        label={e.Location}
                                                        onChange={(e) => {
                                                            setObj_start(
                                                                parseInt(
                                                                    (
                                                                        e.target as HTMLTextAreaElement
                                                                    ).value
                                                                )
                                                            );
                                                            setChange(true);
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="pb-2 sm:py-0 sm:ml-2 sm:mt-0 mt-3 rounded-3xl w-full sm:w-2/5 bg-white">
                            <div className="text-center text-lg p-4 bg-yellow-400 rounded-t-3xl w-full">
                                ปลายทาง
                            </div>
                            <div className="sm:px-12 px-4 mt-2 mb-2">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        {Location.map((e: LocationType) => {
                                        return (
                                            <div>
                                                <FormControlLabel
                                                    value={e.LId}
                                                    disabled={
                                                        e.LId === obj_start
                                                    }
                                                    control={<Radio />}
                                                    checked={obj_end === e.LId}
                                                    label={e.Location}
                                                    onChange={(e) => {
                                                        setObj_end(
                                                            parseInt(
                                                                (
                                                                    e.target as HTMLTextAreaElement
                                                                ).value
                                                            )
                                                        );
                                                        setChange(true);
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Path;
