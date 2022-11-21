import { useEffect } from "react";

type TypeRoutePath = {
    bus_id: number;
    location_start: number;
    location_end: number;
    round_id: number;
    time_start: number;
}[];

const BookingSelectTime = ({
    setOpen,
    routePath,
    round_id,
    setRound_id,
}: {
    setOpen: React.Dispatch<React.SetStateAction<number>>;
    routePath: TypeRoutePath;
    round_id: number;
    setRound_id: React.Dispatch<React.SetStateAction<number>>;
}) => {
    useEffect(() => {
        if (routePath.length === 0) {
            setOpen(1);
            alert("ไม่พบเส้นทางการเดินรถ โปรดเปลื่อนเส้นทาง");
        }
        // console.log(routePath);
    }, []);

    return (
        <div className="">
            {routePath.map((e) => {
                return (
                    <div>
                        <input
                            type="radio"
                            name="round_id"
                            value={e.round_id}
                            checked={e.round_id === round_id}
                            onChange={(e) => {
                                setRound_id(parseInt(e.target.value));
                            }}
                        />
                        {
                            new Date(e.time_start).toString()
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default BookingSelectTime;
