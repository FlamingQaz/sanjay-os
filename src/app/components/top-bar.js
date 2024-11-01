"use-client"

import { useEffect, useState } from "react";

const dateOpts = {
    weekday: "short",
    month: "short",
    day: "2-digit"
};

const timeOpts = {
    timeStyle: "short"
};

export default function TopBar({ openTopMenu, isTopMenuOpen }) {
    const datetime = new Date();
    const [time, setTime] = useState(datetime.toLocaleTimeString({}, timeOpts));
    const [date, setDate] = useState(datetime.toLocaleDateString({}, dateOpts));

    useEffect(() => {
        const timer = setInterval(() => {
            const datetime = new Date();
            setTime(datetime.toLocaleTimeString({}, timeOpts));
            setDate(datetime.toLocaleDateString({}, dateOpts));
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div className="w-full h-fit text-sm p-1 pl-3 pr-3 box-border flex flex-row gap-4 fixed top-0 left-0 z-30 *:pt-1 *:pb-1">
            <div className="font-bold h-full">
                {time}
            </div>
            <div className="font-bold h-full">
                {date}
            </div>
            <div className="flex-grow h-full"></div>
            <div className="font-bold bg-black/20 backdrop-blur-sm border-b-2 border-black/40 h-full pl-2 pr-2 rounded-md cursor-pointer" onClick={() => openTopMenu(!isTopMenuOpen)}>
                {isTopMenuOpen ? "Close" : "Open"} Menu
            </div>
        </div>
    );
}