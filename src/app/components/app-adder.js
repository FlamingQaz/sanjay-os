"use-client"

import { useRef, useState } from "react";
import { addApp, removeApp, getApps, defaultApps } from "../globals";


const inputClasses = "w-full flex-grow outline-none text-gray-300 placeholder:text-gray-500 bg-black/30 rounded-lg p-3 pl-4 pr-4";

export default function AppAdder() {
    const appName = useRef(null);
    const appURL = useRef(null);
    const imageURL = useRef(null);
    const [isRemove, setRemove] = useState(false);

    function onClick() {
        if (isRemove) {
            if (appName.current.value.toLowerCase() in defaultApps)
                alert("Cannot remove built-in apps.");
            else {
                removeApp(appName.current.value.toLowerCase());
                setRemove(false);
            }
        }
        else {
            addApp(appName.current.value.toLowerCase(), appURL.current.value, imageURL.current.value);
            setRemove(true);
        }
    }

    function checkRemove() {
        setRemove(appName.current.value.toLowerCase() in getApps());
    }

    return (
        <>
        <div className="col-span-full flex items-center justify-center sm:flex-row gap-5 flex-col">
            <input type="text" className={inputClasses} placeholder="App Name" ref={appName} onInput={checkRemove} />
            {!isRemove ? <input type="text" className={inputClasses} placeholder="Destination URL" ref={appURL} /> : ""}
        </div>
        <div className="col-span-full flex items-center justify-center flex-col gap-5">
        {!isRemove ? <input type="text" className={inputClasses} placeholder="Icon URL" ref={imageURL} /> : ""}
            <button className="w-full flex-grow bg-blue-600/30 hover:bg-blue-600/40 transition-colors duration-300 ease-in-out backdrop-blur-sm rounded-md p-3 pl-5 pr-5" onClick={onClick}>
                {isRemove ? "Remove" : "Add"} App
            </button>
        </div>
        </>
    );
}