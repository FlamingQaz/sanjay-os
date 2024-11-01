"use-client"

export default function Background({ blur=false }) {
    let classes = "w-full h-full fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-no-repeat z-0";
    if (blur) classes += " blur-xl";

    return (
        <div className={classes}></div>
    );
}