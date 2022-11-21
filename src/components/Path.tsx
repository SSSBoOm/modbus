import axios from "axios";
import { useEffect, useState } from "react";
import { Location, LocationType } from "../data/Location";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const Path = ({
    change,
    setChange,
    obj_start,
    setObj_start,
    obj_end,
    setObj_end,
}: {
    change: boolean;
    setChange: React.Dispatch<
    React.SetStateAction<boolean>
    >;
    obj_start: number;
    setObj_start: React.Dispatch<
        React.SetStateAction<number>
    >;
    obj_end: number;
    setObj_end: React.Dispatch<
        React.SetStateAction<number>
    >;
}) => {

    return (
        <div className="flex justify-center m-2 p-12">
            <div className="p-16 rounded-3xl w-8/12 bg-gray-200">
                <div className="flex justify-center">
                    <div className="px-6 py-4 text-center bg-red-300 rounded-full">
                        เลือกเส้นทาง
                    </div>
                </div>
                <div className="flex">
                    <div className="">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">ต้นทาง</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                        {Location.map((e: LocationType) => {
                            return (
                                <div>
                                    <FormControlLabel value={e.LId}  disabled={e.LId === obj_end} control={<Radio />} label={e.Location} onChange={(e) => {
                                            setObj_start(parseInt((e.target as HTMLTextAreaElement).value));
                                            setChange(true)
                                        }} />
                                </div>
                            );
                        })}
                          </RadioGroup>
                    </FormControl>  
                    </div>
                    <div className="">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">ต้นทาง</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="1"
                            name="radio-buttons-group"
                        >
                        {Location.map((e: LocationType) => {
                            return (
                                <div>
                                    <FormControlLabel value={e.LId}  disabled={e.LId === obj_start} control={<Radio />} label={e.Location} onChange={(e) => {
                                            setObj_end(parseInt((e.target as HTMLTextAreaElement).value));
                                            setChange(true)
                                        }} />
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
