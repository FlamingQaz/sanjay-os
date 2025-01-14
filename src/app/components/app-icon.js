"use-client"

import { togglePinApp, unimplementedApps } from "../globals";

export default function AppIcon({ icon, name, url }) {

    function onRightClick(event) {
        event.preventDefault();
        const result = togglePinApp(name.toLowerCase());
        alert((result ? "Pinned app:" : "Unpinned app:") + " " + name)
    }

    function onClick() {
        if (unimplementedApps.includes(name.toLowerCase())) alert(`The ${name} app is currently still being developed. Coming soon!`)
        else window.open(url, "_blank");
    }

    return (
        <div className="p-1 h-fit flex flex-col items-center gap-1 transition-transform cursor-pointer hover:scale-110" onContextMenu={onRightClick} onClick={onClick}>
            <div className={"p-1 rounded-lg w-16 h-16 bg-[length:94px_94px] bg-center"} style={{backgroundImage: "url('" + icon + "'), linear-gradient(to bottom, #333333, #000000)"}}></div>
            <span className="text-sm">{name}</span>
        </div>
    );
}