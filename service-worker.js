import { precacheAndRoute } from "workbox-precaching";
import { setCacheNameDetails } from "workbox-core";

setCacheNameDetails({
    prefix: "sanjay-os",
    suffix: "v1"
});

precacheAndRoute(self.__WB_MANIFEST);