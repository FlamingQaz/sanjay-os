"use-client"

export default function AppIconGroupHeader({ name }) {
    return (
        <div className="col-span-full outline-none text-gray-400 text-xs rounded-t-lg pl-4 pr-4 -mt-10 -ml-10 -mr-10 p-3 overflow-hidden transition-all duration-500 ease-in-out group-hover:text-gray-300">
            {name}
        </div>
    );
}