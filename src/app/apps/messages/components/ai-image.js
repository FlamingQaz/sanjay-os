"use client"

import { useState, useRef, useEffect } from "react";
import AtomicSpinner from "atomic-spinner";

const MAX_SEED = 100;
const styles = ["Photo","Anime","Hyper-Realistic","Abstract","Surrealist","Black and White","Fantasy","Comic"];

function createSource(aiPrompt, style, seed) {
    const stylePrompt = ` in a ${style} style`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt + stylePrompt)}?seed=${seed}&nologo=true&private=true&width=2000&height=2000`;
}

export default function AiImage({ width, height, alt: aiPrompt }) {
    const [seed, setSeed] = useState(0);
    const [style, setStyle] = useState(0);

    const source = createSource(aiPrompt, styles[style], seed);

    const image = useRef(null);
    const loader = useRef(null);
    useEffect(() => {
        // Handle image loader
        loader.current.style.visibility = "visible";
        const hide = () => {
            loader.current.style.visibility = "hidden";
        };
        if (image.current.complete && image.current.naturalWidth != 0) hide();
        image.current.addEventListener("load", hide);

        return () => image.current?.removeEventListener("load", hide);
    });

    function saveImage() {
        const canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image.current, 0, 0, 2000, 2000);
        
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "sanjayos-gen.png";
        link.click();
    }

    return (
        <div className="relative flex flex-col group select-none">
            <img
                src={source}
                width={width}
                height={height}
                ref={image}
                className="rounded-3xl"
                alt={aiPrompt}
                crossOrigin="anonymous"
            />
            <div className="w-full text-center absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-shadow-thick-[black]">
                <span className="font-bold">Style:&nbsp;</span>
                <span>{styles[style]}</span>
                <span>,&nbsp;</span>
                <span className="font-bold">Seed:&nbsp;</span>
                <span>{seed}</span>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 items-center justify-center bg-black/30 backdrop-blur-md rounded-3xl" ref={loader}>
                <AtomicSpinner
                    atomSize={200}
                    displayElectronPaths={false}
                    displayNucleus={true}
                    electronPathCount={10}
                    nucleusParticleFillColor="#eee"
                    electronColorPalette={["var(--sos-self-msg)"]}
                />
                <p className="-mt-6">Loading...</p>
            </div>
            <div className="absolute bottom-1 w-full flex flex-row justify-center items-center gap-1">
                <button title="Switch Style" className="ml-1 p-1 h-6 w-6 rounded-full text-lg [line-height:0] flex items-center justify-center bg-black/60 enabled:hover:bg-gray-800/60 transition-colors duration-300 ease-in-out backdrop-blur-md" onClick={() => setStyle((style + 1) % styles.length)}>
                    &#x2B6E;
                </button>
                <button title="Previous Version" className="p-1 h-6 w-6 rounded-full text-lg [line-height:0] flex items-center justify-center bg-black/60 enabled:hover:bg-gray-800/60 transition-colors duration-300 ease-in-out backdrop-blur-md" disabled={seed == 0} onClick={() => setSeed(Math.max(seed - 1, 0))}>
                    &#x1F868;
                </button>
                <button title="Next Version" className="p-1 h-6 w-6 rounded-full text-lg [line-height:0] flex items-center justify-center bg-black/60 enabled:hover:bg-gray-800/60 transition-colors duration-300 ease-in-out backdrop-blur-md" disabled={seed == MAX_SEED} onClick={() => setSeed(Math.min(seed + 1, MAX_SEED))}>
                    &#x1F86A;
                </button>
                <button title="Download" className="mr-1 p-1 h-6 w-6 rounded-full text-lg [line-height:0] flex items-center justify-center bg-black/60 enabled:hover:bg-gray-800/60 transition-colors duration-300 ease-in-out backdrop-blur-md" onClick={saveImage}>
                    &#x2B73;
                </button>
            </div>
        </div>
    );
}