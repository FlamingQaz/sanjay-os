
import { useState, useEffect } from "react";
import { getCustomState, setCustomState } from "../globals";

export default function TopTabs({ content={}, uuid }) {
    const [tab, setTab] = useState(null);

    function onSelectTab(tabName) {
        if (tabName != tab) {
            setCustomState("sos_tab_" + uuid, { tab: tabName });
            setTab(tabName);
        }
    }

    useEffect(() => {
        const state = getCustomState("sos_tab_" + uuid);
        if (state && Object.keys(content).includes(state.tab)) setTab(state.tab);
        else setTab(Object.keys(content)[0]);

        // Locally save state of tabs
        const onUnload = () => {
            setCustomState("sos_tab_" + uuid, { tab });
        };
        window.addEventListener("beforeunload", onUnload);

        return () => {
            window.removeEventListener("beforeunload", onUnload);
        };
    });

    if (tab == null) return null;

    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full h-12 bg-black/80 backdrop-blur-md flex flex-row border-b-2 border-white/40 gap-[1px]">
                {/* Tab Names */}
                {Object.keys(content).map(tabName =>
                <div className={"h-full w-fit box-border p-1 px-5 flex items-center justify-center transition-all duration-300 font-bold border-b-4 " + (tabName == tab ? `border-orange-300 text-orange-300` : "border-white/70 text-white/70 hover:border-white/90 hover:text-white/90 cursor-pointer")} key={tabName} onClick={() => onSelectTab(tabName)}>
                    {tabName}
                </div>)}
                {/* Logo */}
                <div className="h-full flex-grow"></div>
                <a className="h-full w-fit box-border p-1 px-5 flex items-center justify-center border-b-2 border-transparent text-white/20 font-bold" href="/">
                    sanjayOS
                </a>
            </div>
            <div className="w-full h-full flex-grow">
                {/* Tab Content */}
                {content[tab]}
            </div>
        </div>
    );
}