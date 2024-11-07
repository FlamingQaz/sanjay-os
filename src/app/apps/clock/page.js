"use client"

import ClockContainer from "./components/clock-container";

export default function ClockPage() {
    return (
        <div className="bg-gray-950 w-full min-h-screen h-auto flex flex-col items-center justify-center flex-wrap p-4 gap-6">
            <ClockContainer width="20rem" />
        </div>
    );
}