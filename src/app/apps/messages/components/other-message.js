"use client"

import { useEffect } from "react";
import AiImage from "./ai-image";

import AtomicSpinner from "atomic-spinner";
import Image from "next/image";

import Markdown from "react-markdown";
const customComponents = {
    /*
        Based on: https://amirardalan.com/blog/use-next-image-with-react-markdown
    */
    p: (paragraph) => {
        const { node } = paragraph;

        if (node.children[0]?.value == "$SanjayOS_Prompt$" && node.children[1]?.tagName === "img") {
            const image = node.children[1];
            const metastring = image.properties.alt;
            const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
            // const metaWidth = metastring.match(/{([^}]+)x/);
            // const metaHeight = metastring.match(/x([^}]+)}/);
            // const width = metaWidth ? metaWidth[1] : "768";
            // const height = metaHeight ? metaHeight[1] : "432";

            return (
                <AiImage
                    width={2000}
                    height={2000}
                    alt={alt}
                />
            )
        }
        return <p>{paragraph.children}</p>
    }
}

export default function MessagesOther({ username, message = "", loading=false, offline=false }) {
    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <div className="w-full max-w-full flex flex-row self-start mb-5 last:mb-0">
            <div className="w-auto max-w-full flex flex-col overflow-hidden">
                <p className="text-gray-400 text-xs sm:text-sm ml-3">{username}</p>
                <div className="bg-gray-800 py-3 px-4 rounded-3xl self-center text-sm sm:text-base select-text selection:bg-white/40 w-max max-w-full lg:max-w-full xl:max-w-screen-lg">
                    {loading ?
                        <AtomicSpinner
                            atomSize={100}
                            displayElectronPaths={false}
                            displayNucleus={true}
                            electronPathCount={10}
                            nucleusParticleFillColor="#eee"
                            electronColorPalette={["var(--sos-self-msg)"]}
                        /> : (!offline ? <Markdown components={customComponents}>{message}</Markdown> : "")}
                    {offline ?
                        <div className="flex flex-col justify-center items-center gap-2">
                            <img src="/no-internet.png" alt="No Internet" loading="lazy" width={64} height={64} className="invert" />
                            <span className="text-xs">Sorry, you're not connected to the internet :(</span>
                        </div> : ""}
                </div>
            </div>
            <div className="w-0 sm:w-40"></div>
        </div>
    );
}