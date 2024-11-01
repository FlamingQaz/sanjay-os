"use-client"

import AppIconGroup from "./app-icon-group";
import AppIcon from "./app-icon";
import AppSearch from "./app-search";
import AppIconGroupHeader from "./app-group-header";
import AppAdder from "./app-adder";

import { getApps, title, getPinnedApps } from "../globals";
import { useState, useEffect } from "react";

export default function TopMenu({ open }) {
    let classes = "flex flex-col items-center w-full h-full fixed top-0 left-0 p-16 pt-14 gap-5 content-start bg-black/30 backdrop-blur-md border-b-4 border-black/20 z-20 transition-transform ease-in-out duration-1000 overflow-y-auto no-scrollbar";
    classes += open ? " translate-y-0" : " -translate-y-full";

    const [searchedApps, setSearchedApps] = useState(Object.keys(getApps()));
    const [pinnedApps, setPinnedApps] = useState(getPinnedApps());

    function onSearch(event) {
        const value = event.target.value;

        if (value == "") {
            setSearchedApps(Object.keys(getApps()));
        }
        else {
            setSearchedApps(Object.keys(getApps()).filter(app => app.match(value.toLowerCase())));
        }
    }

    useEffect(() => {
        const onUpdatePins = () => {
            setPinnedApps(getPinnedApps());
        };
        window.addEventListener("update_pins", onUpdatePins);

        const onUpdateApps = () => {
            setSearchedApps(Object.keys(getApps()));
        };
        window.addEventListener("update_apps", onUpdateApps);

        return () => {
            window.removeEventListener("update_pins", onUpdatePins);
            window.removeEventListener("update_apps", onUpdateApps);
        };
    });

    return (
        <div className={classes}>
            <AppIconGroup>
                <AppIconGroupHeader name="Pinned Apps" />
                {/* Pinned Apps */}
                {pinnedApps.length == 0 ? <div className="col-span-full text-gray-500 text-center">No Pinned Apps</div> : ""}
                {pinnedApps.map(app => <AppIcon icon={getApps()[app][1]} name={title(app)} key={app} url={getApps()[app][0]} />)}
            </AppIconGroup>
            <AppIconGroup>
                <AppIconGroupHeader name="Manage Apps" />
                {/* Manage Apps */}
                <AppAdder />
            </AppIconGroup>
            <AppIconGroup>
            <AppSearch onSearch={onSearch} />
                {/* Search Apps */}
                {searchedApps.map(app => <AppIcon icon={getApps()[app][1]} name={title(app)} key={app} url={getApps()[app][0]} />)}
            </AppIconGroup>
        </div>
    )
}