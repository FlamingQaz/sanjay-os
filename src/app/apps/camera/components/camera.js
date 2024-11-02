
import { useEffect, useState, useRef } from "react";

export default function Camera({ isRear=false }) {
    const [stream, setStream] = useState(null);
    const video = useRef(null);
    const image = useRef(null);

    useEffect(() => {
        // Get video stream
        async function fetchStream() {
            try {
                const rawStream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: isRear ? "environment" : "user"
                    }
                });
                setStream(rawStream);
                
                // Create video element streaming the camera
                video.current.srcObject = rawStream;
                video.current.play();
            } catch (err) {
                setStream(null);
            }
        }
        fetchStream();

        // Get image from video stream
        video.current.onclick = () => {
            // Create virtual canvas element
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = video.current.videoWidth;
            canvas.height = video.current.videoHeight;
            ctx.drawImage(video.current, 0, 0, canvas.width, canvas.height);

            // Get image data URL
            const url = canvas.toDataURL("image/png");
            image.current.setAttribute("src", url);
        };

        return () => {
            video.current.srcObject.getTracks().forEach(track => track.stop());
        };
    }, [isRear]);

    return (
        <>
            <div className={stream ? "hidden" : "block"}>
                No permission.
            </div>
            <div className={!stream ? "hidden" : "block"}>
                <video ref={video}></video>
                <img ref={image} />
            </div>
        </>
    );
}