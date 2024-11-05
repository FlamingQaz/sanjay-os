"use client"

import { useEffect } from "react";
import Markdown from "react-markdown";

export default function MessagesSelf({ message="" }) {
    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <div className="w-full flex flex-row self-end gap-1 mb-5 last:mb-0">
            <div className="w-20 sm:w-40 grow"></div>
            <div className="bg-[--sos-self-msg] py-3 px-4 rounded-3xl self-center text-sm sm:text-base select-text selection:bg-white/40">
                <Markdown>{message}</Markdown>
            </div>
        </div>
    );
}