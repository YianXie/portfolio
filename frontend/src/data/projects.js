// The four projects featured on /projects, in display order. `move` is the
// stone number the project has on the home page board.
//
// `fallbackLanguages` mirrors the byte counts GitHub reports for each repo. The
// page fetches live counts on mount and only falls back to these when the
// request fails (the unauthenticated GitHub API allows 60 requests per hour).
const projects = [
    {
        id: "lucidtree",
        move: 11,
        name: "LucidTree",
        owner: "YianXie",
        repo: "LucidTree",
        screenshot: "/projects/lucidtree-shot.jpg",
        screenshotAlt:
            "LucidTree training overview chart: loss curves and validation accuracy over 15 epochs",
        caption: "~/lucidtree/training.png",
        highlight: "Trained on AWS",
        description:
            "A Go engine built the AlphaZero way: a policy network trained from scratch in PyTorch on AWS, paired with Monte Carlo Tree Search. Rotating and reflecting every board position expands the professional game dataset eightfold.",
        links: [
            {
                label: "git clone →",
                href: "https://github.com/YianXie/LucidTree",
            },
        ],
        fallbackLanguages: { Python: 323769, Shell: 2443, Makefile: 1224 },
    },
    {
        id: "kifu-sensei",
        move: 13,
        name: "Kifu-Sensei",
        owner: "YianXie",
        repo: "Kifu-Sensei",
        screenshot: "/projects/kifu-sensei-shot.jpg",
        screenshotAlt:
            "Kifu-Sensei home page showing a Go board and written move commentary",
        caption: "https://kifu-sensei.ai",
        highlight: "Live site",
        description:
            "Claude-powered commentary for your Go games. Upload an SGF and every significant move comes back explained in plain language, backed by KataGo analysis, as a web app and as a Chrome extension that works right on OGS.",
        links: [
            {
                label: "kifu-sensei.ai ↗",
                href: "https://kifu-sensei.ai",
                primary: true,
            },
            {
                label: "git clone →",
                href: "https://github.com/YianXie/Kifu-Sensei",
            },
        ],
        fallbackLanguages: {
            Python: 528849,
            TypeScript: 465459,
            CSS: 91637,
            HTML: 24610,
            JavaScript: 4711,
            Shell: 4260,
            Makefile: 3348,
            Mako: 720,
        },
    },
    {
        id: "better-usaco",
        move: 9,
        name: "Better USACO",
        owner: "YianXie",
        repo: "better-usaco",
        screenshot: "/projects/better-usaco-shot.jpg",
        screenshotAlt:
            "A USACO problem analysis page in the extension's dark theme",
        caption: "usaco.org, with better-usaco on",
        highlight: "500+ installs",
        description:
            "A quality-of-life Chrome extension that rebuilds the usaco.org experience: dark mode, cleaner problem pages, and readable contest analyses.",
        links: [
            {
                label: "Chrome Web Store ↗",
                href: "https://chromewebstore.google.com/detail/better-usaco/mcmnjckmjhifcbfcakbpiedemkmdgahn",
                primary: true,
            },
            {
                label: "git clone →",
                href: "https://github.com/YianXie/better-usaco",
            },
        ],
        fallbackLanguages: { JavaScript: 36890, CSS: 24972, HTML: 7450 },
    },
    {
        id: "pathfinder",
        move: 7,
        name: "PathFinder",
        owner: "YianXie",
        repo: "path-finder",
        screenshot: "/projects/pathfinder-shot.jpg",
        screenshotAlt: "PathFinder home page listing student clubs as cards",
        caption: "https://www.sas-pathfinder.org",
        highlight: "2nd place, SAS CSHS Hackathon",
        description:
            "A full-stack web application that helps SAS students choose their extracurricular activities, with personalized club and activity recommendations powered by the OpenAI API.",
        links: [
            {
                label: "sas-pathfinder.org ↗",
                href: "https://www.sas-pathfinder.org",
                primary: true,
            },
            {
                label: "git clone →",
                href: "https://github.com/YianXie/path-finder",
            },
        ],
        fallbackLanguages: {
            JavaScript: 223772,
            Python: 124943,
            Shell: 3712,
            Makefile: 1788,
            HTML: 792,
            CSS: 139,
        },
    },
];

const github = "https://github.com/YianXie/";

export const moreProjects = [
    {
        id: "lucidgo",
        move: 5,
        name: "LucidGo",
        description: "Open-source web app for visually analysing Go games.",
        stack: "React · TS · Django REST",
        href: "https://lucidgo.org",
    },
    {
        id: "stable-sponsors",
        move: 15,
        name: "Stable-Sponsors",
        description:
            "Constraint-based reallocation of SAS's interim-semester sponsor matching, comparing CP-SAT / OR-Tools objectives with deferred acceptance.",
        stack: "Python · OR-Tools",
        href: `${github}Stable-Sponsors`,
    },
    {
        id: "reluminate-echo",
        move: 17,
        name: "ReLuminate-Echo",
        description:
            "An audio-first beacon-hunt game for youth with visual impairments, part of ReLuminate.",
        stack: "TypeScript",
        href: "https://play.reluminate-global.org",
    },
];

export const miscProjects = [
    ["usaco-solutions", "my C++ solutions to USACO problems"],
    ["portfolio", "the source of yianxie.me (React + Django)"],
    [
        "React-DRF-Website-Template",
        "how I start every React + Django REST project",
    ],
    ["magic-club", "the SAS Magic Club's website"],
    ["Review-Sentiment-App", "NLP study project"],
    ["Face-Detector", "CV study project"],
    ["Game-Jam", "a 2D game in PixiJS"],
    ["gomoku", "five-in-a-row, online, unfinished (sorry)"],
].map(([name, description]) => ({
    name,
    description,
    href: `${github}${name}`,
}));

export default projects;
