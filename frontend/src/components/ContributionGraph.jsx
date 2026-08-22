import { useEffect, useRef, useState } from "react";

import "../styles/ContributionGraph.css";

const USERNAME = "YianXie";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const CACHE_KEY = "github-contributions";
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
// Only every other weekday gets a label, the same way GitHub does it
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

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

// A month label sits above the first week-column that belongs to that month
function buildMonthLabels(weeks) {
    let lastMonth = -1;

    return weeks.map((week) => {
        const firstDay = week.find(Boolean);
        if (!firstDay) return "";

        const month = parseDay(firstDay.date).getMonth();
        if (month === lastMonth) return "";

        lastMonth = month;
        return MONTHS[month];
    });
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
    const calendarRef = useRef(null);

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

    // When the calendar is too narrow to fit, show the most recent weeks first
    useEffect(() => {
        const calendar = calendarRef.current;
        if (calendar) calendar.scrollLeft = calendar.scrollWidth;
    }, [data]);

    // The hero reads fine without the graph, so stay out of the way on failure
    if (failed) return null;

    // Placeholder columns keep the card from collapsing while loading
    const weeks = data
        ? buildWeeks(data.contributions)
        : Array.from({ length: 53 }, () => new Array(7).fill(null));
    const monthLabels = buildMonthLabels(weeks);
    const total = data?.total?.lastYear ?? 0;

    return (
        <a
            className={`contribution-graph${data ? "" : " is-loading"}`}
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${total} GitHub contributions in the last year`}
        >
            <div className="contribution-header">
                <i className="bx bxl-github"></i>
                <span>
                    {data
                        ? `${total.toLocaleString()} contributions in the last year`
                        : "Loading contributions…"}
                </span>
            </div>

            <div className="contribution-body">
                <div className="contribution-weekdays" aria-hidden="true">
                    {WEEKDAYS.map((label, index) => (
                        <span key={index}>{label}</span>
                    ))}
                </div>

                <div className="contribution-calendar" ref={calendarRef}>
                    <div className="contribution-months" aria-hidden="true">
                        {monthLabels.map((label, index) => (
                            <span key={index}>{label}</span>
                        ))}
                    </div>

                    <div className="contribution-weeks">
                        {weeks.map((week, weekIndex) => (
                            <div className="contribution-week" key={weekIndex}>
                                {week.map((day, dayIndex) => (
                                    <span
                                        key={day ? day.date : dayIndex}
                                        className="contribution-day"
                                        data-level={day ? day.level : "empty"}
                                        title={day ? describeDay(day) : ""}
                                    ></span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="contribution-legend" aria-hidden="true">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <span
                        key={level}
                        className="contribution-day"
                        data-level={level}
                    ></span>
                ))}
                <span>More</span>
            </div>
        </a>
    );
}

export default ContributionGraph;
