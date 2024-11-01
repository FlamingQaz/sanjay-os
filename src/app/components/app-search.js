"use-client"

export default function AppSearch({ onSearch }) {
    return (
        <input type="search" placeholder="Search..." onInput={onSearch} className="col-span-full outline-none text-gray-300 placeholder:text-gray-500 bg-black/30 rounded-t-lg p-3 pl-4 pr-4 -mt-10 -ml-10 -mr-10 mb-3" />
    );
}