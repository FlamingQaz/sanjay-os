"use client"

import { useState, useEffect } from "react";

function ClockHour({ hour }) {
    return (
        <div className="text-black absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-start z-40 pointer-events-none" style={{"--tw-rotate": `${(hour % 12)*30}deg`}}>
            <p className={"font-bold text-xl"} style={{"transform": `rotate(${-((hour % 12)*30)}deg)`}}>{hour}</p>
        </div>
    );
}

function ClockHandSeconds({ date=new Date() }) {
    const secs = date.getSeconds() + new Date().getMilliseconds() / 1000;
    const mins = date.getMinutes();
    const hours = date.getHours();

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-start transition-transform duration-75 ease-in-out z-30 pointer-events-none" style={{"--tw-rotate": `${(secs / 60)*360 + mins*360 + hours*60*360}deg`}}>
            <div className="w-1 h-[calc(50%+0.75rem)] mt-3 bg-red-500 rounded-t-full"></div>
        </div>
    );
}

function ClockHandMinutes({ date=new Date() }) {
    const mins = date.getMinutes();

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-start transition-transform duration-300 ease-in-out z-10 pointer-events-none" style={{"--tw-rotate": `${(mins / 60)*360}deg`}}>
            <div className="w-2 h-[calc(50%-0.75rem)] mt-3 bg-black rounded-t-full"></div>
        </div>
    );
}

function ClockHandHours({ date=new Date() }) {
    const hours = date.getHours();

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-start transition-transform duration-300 ease-in-out z-10 pointer-events-none" style={{"--tw-rotate": `${(hours / 12)*360}deg`}}>
            <div className="w-2 h-1/3 bg-black translate-y-1/2 rounded-t-full"></div>
        </div>
    );
}

function ClockCenter({ topLabel, bottomLabel }) {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full border-4 border-black bg-white"></div>
            <div className="text-gray-400 absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:z-40 hover:scale-125 hover:bg-gray-950/40 hover:backdrop-blur-sm hover:text-white hover:p-1 hover:rounded-md">
                <span className="text-center">{topLabel}</span>
                <span className="text-center">{bottomLabel}</span>
            </div>
        </>
    );
}

function getDateWithTimezone(timezone) {
    const timezoneOffsetRaw = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: "longOffset"
    }).format(new Date()).split("GMT")[1].split(":");

    const timezoneOffsetHours = Number(timezoneOffsetRaw[0]) * 60;
    const timezoneOffsetMins = Number(timezoneOffsetRaw[1]);
    const ownOffset = new Date().getTimezoneOffset();

    const totalOffset = (ownOffset + timezoneOffsetHours + timezoneOffsetMins) * 60 * 1000;
    return new Date(Date.now() + totalOffset);
}

export function isValidTimezone(timezone) {
    return !isNaN(getDateWithTimezone(timezone));
}

export default function Clock({ timezone, width="100%", frequency=50 }) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = getDateWithTimezone(timezone);
            setDate(newDate);
        }, frequency);
        setDate(new Date());

        return () => {
            clearInterval(interval);
        }
    }, [timezone]);

    if (!date) return null;

    return (
        <>
            <div className="relative aspect-square bg-white p-3 rounded-full" style={{width, height: width}}>
                <ClockHour hour={1} />
                <ClockHour hour={2} />
                <ClockHour hour={3} />
                <ClockHour hour={4} />
                <ClockHour hour={5} />
                <ClockHour hour={6} />
                <ClockHour hour={7} />
                <ClockHour hour={8} />
                <ClockHour hour={9} />
                <ClockHour hour={10} />
                <ClockHour hour={11} />
                <ClockHour hour={12} />
                <ClockHandSeconds date={date} />
                <ClockHandMinutes date={date} />
                <ClockHandHours date={date} />
                <ClockCenter topLabel={date.toLocaleTimeString({}, { timeStyle: "short" })} bottomLabel={timezone.split("/")[1].replace(/_/g, " ")} />
            </div>
        </>
    );
}