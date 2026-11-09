import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router leaves scroll position alone, so links near the bottom of a page
// would otherwise land partway down the next one.
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const target = hash && document.getElementById(hash.slice(1));
        if (target) {
            target.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}

export default ScrollManager;
