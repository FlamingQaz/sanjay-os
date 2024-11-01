"use-client"

export default function AppIconGroup({ children }) {
    return (
        <div className="group grid grid-cols-auto-fill-100 gap-4 w-full bg-black/20 backdrop-blur-md p-10 rounded-lg content-start">
            {children}
        </div>
    );
}