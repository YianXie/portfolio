// Inline style for a staggered [data-reveal] item. Capped so long lists don't
// keep the last rows waiting after they scroll into view.
export const stagger = (index, step = 60) => ({
    "--d": `${Math.min(index, 8) * step}ms`,
});

export const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
