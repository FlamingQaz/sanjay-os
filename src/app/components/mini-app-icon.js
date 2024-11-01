

export default function MiniAppIcon({ icon }) {
    return (
        <div className="p-1 h-fit flex flex-col items-center gap-1 -m-1">
            <div className={"p-1 rounded-lg w-6 h-6 bg-[length:30px_30px] bg-center"} style={{backgroundImage: "url('" + icon + "'), linear-gradient(to bottom, #333333, #000000)"}}></div>
        </div>
    );
}