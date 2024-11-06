"use client"

import Clock from "./components/clock";

export default function ClockPage() {
    return (
        <div className="bg-gray-950 w-full h-full flex flex-row justify-center flex-wrap p-4 gap-0 sm:gap-6">
            <Clock width="20rem" />
            <Clock width="20rem" timezone="America/Los_Angeles" />
            <Clock width="20rem" timezone="Asia/Kolkata" />
        </div>
    );
}