import { useLayoutEffect } from "react";

import { prefersReducedMotion } from "../utils/motion";

const SELECTOR = "[data-reveal]:not([data-shown])";

// Marks [data-reveal] elements with data-shown as they scroll into view; the
// animations themselves live in Motion.css. A MutationObserver picks up each
// route's elements, plus anything that mounts after a fetch.
function RevealObserver() {
    useLayoutEffect(() => {
        if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
            return undefined;
        }

        const html = document.documentElement;
        html.classList.add("reveal-ready");

        const intersection = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.dataset.shown = "";
                    intersection.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -10% 0px" }
        );

        const watch = (node) => {
            if (!(node instanceof Element)) return;
            if (node.matches(SELECTOR)) intersection.observe(node);
            node.querySelectorAll(SELECTOR).forEach((element) =>
                intersection.observe(element)
            );
        };

        const root = document.getElementById("root");
        watch(root);

        const mutations = new MutationObserver((records) => {
            records.forEach((record) => record.addedNodes.forEach(watch));
        });
        mutations.observe(root, { childList: true, subtree: true });

        return () => {
            mutations.disconnect();
            intersection.disconnect();
            html.classList.remove("reveal-ready");
        };
    }, []);

    return null;
}

export default RevealObserver;
