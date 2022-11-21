import axios from "axios";
import { useEffect, useState } from "react";
import { Location, LocationType } from "../data/Location";

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
                        {Location.map((e: LocationType) => {
                            return (
                                <div>
                                    <input
                                        type="radio"
                                        name="location_start"
                                        value={e.LId}
                                        disabled={e.LId === obj_end}
                                        checked={e.LId === obj_start}
                                        onChange={(e) => {
                                            setObj_start(parseInt(e.target.value));
                                            setChange(true)
                                        }}
                                    />
                                    {e.Location}
                                </div>
                            );
                        })}
                    </div>
                    <div className="">
                        {Location.map((e: LocationType) => {
                            return (
                                <div>
                                    <input
                                        type="radio"
                                        name="location_end"
                                        value={e.LId}
                                        disabled={e.LId === obj_start}
                                        checked={e.LId === obj_end}
                                        onChange={(e) => {
                                            setObj_end(parseInt(e.target.value));
                                            setChange(true)
                                        }}
                                    />
                                    {e.Location}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Path;
