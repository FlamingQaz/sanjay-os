"use-client"

import MiniAppIcon from "./mini-app-icon";
import { getApps } from "../globals";

export default function AppFolder({ name, apps }) {
    return (
        <div className="p-1 h-fit flex flex-col items-center gap-1 transition-transform cursor-pointer hover:scale-110">
            <div className="p-1 backdrop-blur-md bg-black/50 rounded-lg w-16 h-16 grid grid-cols-2 gap-0 gap-y-1 content-start">
                {apps.map(app => <MiniAppIcon icon={getApps()[app]?.[1]} key={app} />)}
            </div>
            <span className="text-sm">{name}</span>
        </div>
    );
}