
import { useState } from "react";

export default function TopTabs({ content={}, onTabSwitch=(name)=>{} }) {
    const [tab, setTab] = useState(Object.keys(content)[0]);

    function onSelectTab(tabName) {
        if (tabName != tab) {
            setTab(tabName);
            onTabSwitch(tabName);
        }
    }

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