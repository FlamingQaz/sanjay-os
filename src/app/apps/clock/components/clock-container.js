"use client"

import Clock, { isValidTimezone } from "./clock";

import { useState } from "react";

export default function ClockContainer({ width }) {
    const [timezone, setTimezone] = useState(new Intl.DateTimeFormat().resolvedOptions().timeZone);

    return (
        <>
            <Clock width={width} timezone={timezone} />
            <div className="relative bg-gray-700/30 backdrop-blur-md border-2 border-gray-600 rounded-full flex justify-center group" tabIndex={-1} style={{width}}>
                <p className="h-full w-full py-2 px-4 rounded-full">{timezone}</p>
                <ul className="h-0 max-h-32 w-[calc(100%-1rem)] hidden rounded-b-lg overflow-hidden absolute top-full transition-all duration-1000 ease-in-out bg-gray-700/30 group-focus:block group-focus:h-screen group-focus:overflow-y-auto">
                    {
                        Intl.supportedValuesOf("timeZone").filter(isValidTimezone).map(tz =>
                            <li className="p-4 cursor-pointer hover:bg-gray-700/20" key={tz} onClick={() => setTimezone(tz)}>{tz}</li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}