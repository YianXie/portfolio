import { useSyncExternalStore } from "react";

export const PHONE_QUERY = "(max-width: 640px)";

function useMediaQuery(query) {
    return useSyncExternalStore(
        (onChange) => {
            const media = window.matchMedia(query);
            media.addEventListener("change", onChange);
            return () => media.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches
    );
}

export default useMediaQuery;
