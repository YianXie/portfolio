import { useEffect, useRef, useState } from "react";

import useMediaQuery, { PHONE_QUERY } from "../hooks/useMediaQuery";
import "../styles/ContributionGraph.css";

const USERNAME = "YianXie";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const CACHE_KEY = "github-contributions";
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
const PHONE_WEEKS = 19;
const BLACK_STONE_MIN = 6;
const CELL = 10;

const parseDay = (date) => new Date(`${date}T00:00:00`);

// Split the flat list of days into week-columns, padding the first and last
// week with nulls so every column starts on a Sunday
function buildWeeks(days) {
    const weeks = [];
    let week = new Array(parseDay(days[0].date).getDay()).fill(null);

    days.forEach((day) => {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    });

    if (week.length > 0) {
        weeks.push([...week, ...new Array(7 - week.length).fill(null)]);
    }

    return weeks;
}

function describeDay(day) {
    const date = parseDay(day.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const noun = day.count === 1 ? "contribution" : "contributions";
    return `${day.count} ${noun} on ${date}`;
}

function readCache() {
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (cached && Date.now() - cached.savedAt < CACHE_TTL) {
            return cached.data;
        }
    } catch {
        // Corrupted or unavailable storage, just refetch
    }
    return null;
}

function writeCache(data) {
    try {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ savedAt: Date.now(), data })
        );
    } catch {
        // Storage full or blocked, the graph works fine without a cache
    }
}

function ContributionGraph() {
    const [data, setData] = useState(readCache);
    const [failed, setFailed] = useState(false);
    const isPhone = useMediaQuery(PHONE_QUERY);
    const scrollerRef = useRef(null);

    useEffect(() => {
        if (data) return;

        const controller = new AbortController();

        fetch(API_URL, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((json) => {
                if (!json?.contributions?.length) throw new Error("No data");
                writeCache(json);
                setData(json);
            })
            .catch((error) => {
                if (error.name !== "AbortError") setFailed(true);
            });

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When the board is too narrow to fit, show the most recent weeks first
    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) scroller.scrollLeft = scroller.scrollWidth;
    }, [data, isPhone]);

    // The section reads fine without the board, so stay out of the way
    if (failed) return null;

    // Placeholder columns keep the board from collapsing while loading
    const allWeeks = data
        ? buildWeeks(data.contributions)
        : Array.from({ length: 53 }, () => new Array(7).fill(null));
    const weeks = isPhone ? allWeeks.slice(-PHONE_WEEKS) : allWeeks;
    const total = data?.total?.lastYear ?? 0;
    const width = weeks.length * CELL;
    const height = 7 * CELL;
    const center = (index) => (index + 0.5) * CELL;

    return (
        <div className="contrib">
            <div className="contrib-summary" data-reveal="rise">
                <span>
                    {data
                        ? `${total.toLocaleString()} contributions in the last year`
                        : "Loading contributions…"}
                </span>
                <span className="contrib-legend">
                    one stone per active day · white 1–5 · black 6+
                </span>
            </div>

            <div
                className={`contrib-scroller${isPhone ? " is-phone" : ""}`}
                ref={scrollerRef}
                data-reveal="stones"
            >
                <svg
                    className="contrib-board"
                    viewBox={`0 0 ${width} ${height}`}
                    role="img"
                    aria-label={`Contribution calendar drawn as stones on a ${weeks.length} by 7 board.${
                        data ? ` ${total} contributions in the last year.` : ""
                    }`}
                >
                    {weeks.map((_, x) => (
                        <line
                            key={x}
                            x1={center(x)}
                            y1={center(0)}
                            x2={center(x)}
                            y2={center(6)}
                        />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6].map((y) => (
                        <line
                            key={y}
                            x1={center(0)}
                            y1={center(y)}
                            x2={center(weeks.length - 1)}
                            y2={center(y)}
                        />
                    ))}
                    {weeks.map((week, x) =>
                        week.map((day, y) =>
                            day && day.count > 0 ? (
                                <circle
                                    key={day.date}
                                    cx={center(x)}
                                    cy={center(y)}
                                    r="4.4"
                                    style={{ "--x": x, "--y": y }}
                                    className={
                                        day.count >= BLACK_STONE_MIN
                                            ? "is-black"
                                            : "is-white"
                                    }
                                >
                                    <title>{describeDay(day)}</title>
                                </circle>
                            ) : null
                        )
                    )}
                </svg>
            </div>
        </div>
    );
}

export default ContributionGraph;
