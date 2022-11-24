import axios from "axios";
import { useEffect, useState } from "react";
import { Location, LocationType } from "../data/Location";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
        <div className="flex justify-center m-4">
            <div className="py-6 md:p-12 rounded-3xl bg-gray-50">
                <div className="flex justify-center">
                    <div className="px-6 py-3 text-center bg-white border-2 border-red-200 rounded-full">
                        เลือกเส้นทาง
                    </div>
                </div>
                <div className="md:flex inline w-4/5 sm:w-full justify-between">
                    <div className="px-16 pt-10 pb-2 md:py-16">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                ต้นทาง
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {Location.map((e: LocationType) => {
                                    return (
                                        <div>
                                            <FormControlLabel
                                                value={e.LId}
                                                disabled={e.LId === obj_end}
                                                control={<Radio />}
                                                checked={obj_start === e.LId}
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
                    <div className="px-16 pt-10 pb-2 md:py-16">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                ปลายทาง
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                // defaultValue="1"
                                name="radio-buttons-group"
                            >
                                {Location.map((e: LocationType) => {
                                    return (
                                        <div>
                                            <FormControlLabel
                                                value={e.LId}
                                                disabled={e.LId === obj_start}
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
    );
};

export default Path;
