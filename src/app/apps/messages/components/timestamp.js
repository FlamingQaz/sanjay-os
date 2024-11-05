"use client"

import { useState, useEffect } from "react";

export default function MessagesTimestamp({ datetime=(new Date()) }) {
    const [date, setDate] = useState(datetime.toLocaleDateString({}, {
        weekday: "short",
        month: "short",
        day: "numeric"
    }));

    const [time, setTime] = useState(datetime.toLocaleTimeString({}, {
        timeStyle: "short"
    }));

    useEffect(() => {
        const now = new Date();

        if (datetime.getMonth() == now.getMonth() && datetime.getFullYear() == now.getFullYear()) {
            if (datetime.getDate() == now.getDate()) {
                // The date is today
                setDate("Today");
            }
            else if (datetime.getDate() + 1 == now.getDate()) {
                // The date is yesterday
                setDate("Yesterday");
            }
        }
    });

    return (
        <div className="w-full flex flex-row items-center justify-center text-gray-400 text-xs sm:text-sm mb-4 text-shadow-[--sos-self-msg]">
            <p className="font-bold">{date}</p>
            <p>&nbsp;at&nbsp;</p>
            <p>{time}</p>
        </div>
    );
}