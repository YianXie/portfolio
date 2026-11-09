import { useLayoutEffect, useState } from "react";

import { prefersReducedMotion } from "../utils/motion";

const STORAGE_KEY = "opening-played";
const CENTER_STAGE_MS = 1000;
const MOVE_HOME_MS = 850;
const TOTAL_MS = CENTER_STAGE_MS + 1800;
const SKIP_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"];

function shouldPlay() {
    if (prefersReducedMotion()) return false;
    try {
        return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
        return true;
    }
}

function markPlayed() {
    try {
        sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
        // Blocked storage only means the opening plays again next visit
    }
}

// Once per tab: the board appears center stage, draws its grid, takes move 1,
// then glides to its real spot while the page assembles around it. Any input
// skips straight to the finished page.
function useOpening(boardRef) {
    const [play] = useState(shouldPlay);

    useLayoutEffect(() => {
        if (!play || !boardRef.current) return undefined;

        const html = document.documentElement;
        const board = boardRef.current;

        window.scrollTo(0, 0);
        html.dataset.opening = "board";

        const rect = board.getBoundingClientRect();
        const scale =
            Math.min(window.innerWidth * 0.9, window.innerHeight * 0.84) /
            rect.width;
        const x = window.innerWidth / 2 - (rect.left + rect.width / 2);
        const y = window.innerHeight / 2 - (rect.top + rect.height / 2);

        const glide = board.animate(
            [
                { transform: `translate(${x}px, ${y}px) scale(${scale})` },
                { transform: "none" },
            ],
            {
                delay: CENTER_STAGE_MS,
                duration: MOVE_HOME_MS,
                easing: "cubic-bezier(0.76, 0, 0.18, 1)",
                fill: "backwards",
            }
        );

        const clearTimersAndListeners = () => {
            clearTimeout(settleTimer);
            clearTimeout(doneTimer);
            SKIP_EVENTS.forEach((type) =>
                window.removeEventListener(type, finish)
            );
        };

        const finish = () => {
            clearTimersAndListeners();
            glide.finish();
            delete html.dataset.opening;
            markPlayed();
        };

        const settleTimer = setTimeout(() => {
            html.dataset.opening = "settle";
        }, CENTER_STAGE_MS);
        const doneTimer = setTimeout(finish, TOTAL_MS);

        SKIP_EVENTS.forEach((type) =>
            window.addEventListener(type, finish, { passive: true })
        );

        return () => {
            clearTimersAndListeners();
            glide.cancel();
            delete html.dataset.opening;
        };
    }, [play, boardRef]);
}

export default useOpening;
