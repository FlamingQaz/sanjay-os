"use client"

import * as Asi from "../users/asi/page";
import * as Dev from "../users/dev/page";
import * as Illa from "../users/illa/page";

import Image from "next/image";
import { useState, useEffect } from "react";

import { getCustomState } from "@/app/globals";

function ChatItem({ user, pfp, desc="Placeholder description here." }) {
    const [color, setColor] = useState("transparent");

    useEffect(() => {
        // On mount, get custom color if applicable
        setColor(getCustomState("sos_messages_color_" + user)?.color ?? "#6b7280");
    });

    return (
        <a className="w-full py-3 flex flex-row items-center border-t-2 last:border-b-2 border-gray-800 hover:bg-gray-800" href={`/apps/messages/users/${pfp}`} style={{"--sos-user-color": color}}>
            <Image width={64} height={64} src={`/user-pfps/${pfp}.jpg`} className="w-12 h-12 mr-4 rounded-full" alt="Main avatar" loading="lazy" />
            <div className="w-full flex flex-col">
                <div className="font-bold text-sm sm:text-base lg:text-lg">
                    {user}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm lg:text-base">
                    {desc}
                </div>
            </div>
            <div className="grow"></div>
            <div className="text-[--sos-user-color] ml-4 mr-2">&#x2B9E;</div>
        </a>
    );
}

export default function MessagesChatList() {
    return (
        <div className="w-full min-h-screen h-auto bg-gray-950 relative flex flex-col items-center">
            <div className="w-full p-3 bg-gray-950/20 backdrop-blur-md sticky top-0 self-start flex flex-row items-center justify-center z-10">
                <div className="flex flex-col p-3 absolute top-1/2 -translate-y-1/2 left-0 sm:left-1/2 sm:-translate-x-1/2">
                    <p className="w-full text-center text-4xl font-bold">Messages</p>
                </div>
                <div className="flex flex-col">
                    <div className="w-[64px] h-[64px] p-2 rounded-full invisible"></div>
                    <p className="w-full text-center text-xs invisible">Template</p>
                </div>
                <div className="grow"></div>
            </div>
            <div className="w-full h-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl pt-0 pb-3 px-2 flex flex-col grow overflow-y-visible">
                <ChatItem user={Asi.user} pfp={Asi.pfp} desc={Asi.desc} />
                <ChatItem user={Dev.user} pfp={Dev.pfp} desc={Dev.desc} />
                <ChatItem user={Illa.user} pfp={Illa.pfp} desc={Illa.desc} />
            </div>
        </div>
    );
}