"use-client"

import AppFolder from "./app-folder";
import AppIcon from "./app-icon";
import TopBar from "./top-bar";

import { useEffect, useState } from "react";

import { getApps, title } from "../globals";

export default function HomeScreen({ openTopMenu, isTopMenuOpen }) {
    const [apps, setApps] = useState(getApps());

    useEffect(() => {
        const onAppsUpdated = () => {
            setApps(getApps());
        };
        window.addEventListener("update_apps", onAppsUpdated);
        document.body.classList.add("bg-black");

        return () => {
            window.removeEventListener("update_apps", onAppsUpdated);
            document.body.classList.remove("bg-black");
        };
    });

    return (
        <>
        <TopBar openTopMenu={openTopMenu} isTopMenuOpen={isTopMenuOpen} />
        <div className="w-full h-full fixed top-0 left-0 p-10 pt-14 grid grid-cols-auto-fill-100 gap-5 content-start z-10">
            {Object.entries(apps).map(([app, [url, icon]]) => <AppIcon icon={icon} name={title(app)} key={app} url={url} />)}
            <AppFolder name="Utility" apps={["camera", "settings", "calculator", "photos"]} />
            <AppFolder name="Forecast" apps={["clock", "calendar", "weather", "maps"]} />
            <AppFolder name="Create" apps={["draw", "docs", "nextjs", "tailwind"]} />
        </div>
        </>
    )
}