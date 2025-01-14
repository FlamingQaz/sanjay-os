export const defaultApps = {
    "messages": "/apps/messages",
    "clock": "/apps/clock",
    "calculator": "/apps/calculator",
    "camera": "/apps/camera",
    "photos": "/apps/photos",
    "docs": "/apps/docs",
    "calendar": "/apps/calendar",
    "draw": "/apps/draw",
    "weather": "/apps/weather",
    "maps": "/apps/maps",
    "settings": "/apps/settings"
};

export const unimplementedApps = [
    "photos",
    "docs",
    "calendar",
    "draw",
    "weather",
    "maps",
    "settings"
];

function getDefaultApps() {
    return Object.fromEntries(Object.entries(defaultApps).map(([name, url]) => {
        return [name, [url, "/app-icons/" + name + ".svg"]]
    }));
}

export function getApps() {
    try {
        window;
    }
    catch (err) {
        return getDefaultApps();
    }

    if (!localStorage.getItem("sos_added_apps")) return getDefaultApps();
    return {...getDefaultApps(), ...JSON.parse(localStorage.getItem("sos_added_apps"))};
}

export function addApp(name, url, iconUrl) {
    const addedApps = getApps();
    addedApps[name] = [url, iconUrl];
    localStorage.setItem("sos_added_apps", JSON.stringify(addedApps));
    window.dispatchEvent(new Event("update_apps"));
    return true;
}

export function removeApp(name) {
    const addedApps = getApps();
    delete addedApps[name];
    localStorage.setItem("sos_added_apps", JSON.stringify(addedApps));
    window.dispatchEvent(new Event("update_apps"));

    if (getPinnedApps().includes(name)) unpinApp(name);
    return true;
}

export function title(str="") {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function getPinnedApps() {
    try {
        window;
    }
    catch (err) {
        return [];
    }

    if (!localStorage.getItem("sos_pinned_apps")) return [];
    return JSON.parse(localStorage.getItem("sos_pinned_apps"));
}

export function pinApp(name) {
    const pinnedApps = new Set(getPinnedApps());
    pinnedApps.add(name);
    localStorage.setItem("sos_pinned_apps", JSON.stringify([...pinnedApps.values()]));
    window.dispatchEvent(new Event("update_pins"));
    return true;
}

export function unpinApp(name) {
    const pinnedApps = new Set(getPinnedApps());
    pinnedApps.delete(name);
    localStorage.setItem("sos_pinned_apps", JSON.stringify([...pinnedApps.values()]));
    window.dispatchEvent(new Event("update_pins"));
    return false;
}

export function togglePinApp(name) {
    if (getPinnedApps().includes(name)) return unpinApp(name);
    else return pinApp(name);
}

export function getCustomState(state) {
    if (!localStorage.getItem(state)) return null;
    return JSON.parse(localStorage.getItem(state));
}

export function setCustomState(state, value) {
    localStorage.setItem(state, JSON.stringify(value));
}