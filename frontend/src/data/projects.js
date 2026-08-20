// The four projects featured on /projects, in display order.
//
// `fallbackLanguages` mirrors the byte counts GitHub reports for each repo. The
// page fetches live counts on mount and only falls back to these when the
// request fails (the unauthenticated GitHub API allows 60 requests per hour).
const projects = [
    {
        id: "lucidtree",
        name: "LucidTree",
        owner: "YianXie",
        repo: "LucidTree",
        icon: "/projects/lucidtree-icon.svg",
        screenshot: "/projects/lucidtree-shot.jpg",
        highlight: "Trained on AWS",
        description:
            "A Go engine built the AlphaZero way: a policy network trained from scratch in PyTorch on AWS, paired with Monte Carlo Tree Search. Rotating and reflecting every board position expands the professional game dataset eightfold.",
        links: [
            {
                label: "GitHub",
                href: "https://github.com/YianXie/LucidTree",
                icon: "bx bxl-github",
                primary: true,
            },
        ],
        fallbackLanguages: { Python: 323769, Shell: 2443, Makefile: 1224 },
    },
    {
        id: "kifu-sensei",
        name: "Kifu-Sensei",
        owner: "YianXie",
        repo: "Kifu-Sensei",
        icon: "/projects/kifu-sensei-icon.png",
        screenshot: "/projects/kifu-sensei-shot.jpg",
        highlight: "Live site",
        description:
            "Claude-powered commentary for your Go games. Upload an SGF and every significant move comes back explained in plain language, backed by KataGo analysis — as a web app and as a Chrome extension that works right on OGS.",
        links: [
            {
                label: "Live demo",
                href: "https://kifu-sensei.ai",
                icon: "bx bx-link-external",
                primary: true,
            },
            {
                label: "GitHub",
                href: "https://github.com/YianXie/Kifu-Sensei",
                icon: "bx bxl-github",
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
        id: "pathfinder",
        name: "PathFinder",
        owner: "YianXie",
        repo: "path-finder",
        icon: "/projects/pathfinder-icon.png",
        screenshot: "/projects/pathfinder-shot.jpg",
        highlight: "2nd place — CSHS Hackathon",
        description:
            "A personalized club and activity recommender for SAS students, powered by the OpenAI API. Built with my team for the annual SAS high school hackathon hosted by the Computer Science Honor Society, where it took 2nd place.",
        links: [
            {
                label: "GitHub",
                href: "https://github.com/YianXie/path-finder",
                icon: "bx bxl-github",
                primary: true,
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
    {
        id: "better-usaco",
        name: "Better USACO",
        owner: "YianXie",
        repo: "better-usaco",
        icon: "/projects/better-usaco-icon.png",
        screenshot: "/projects/better-usaco-shot.jpg",
        highlight: "400+ installs",
        description:
            "A quality-of-life Chrome extension that rebuilds the usaco.org experience — dark mode, cleaner problem pages, and readable contest analyses. Over 400 installs on the Chrome Web Store with 25+ weekly active users.",
        links: [
            {
                label: "Chrome Web Store",
                href: "https://chromewebstore.google.com/detail/usaco-dark-mode/mcmnjckmjhifcbfcakbpiedemkmdgahn",
                icon: "bx bx-download",
                primary: true,
            },
            {
                label: "GitHub",
                href: "https://github.com/YianXie/better-usaco",
                icon: "bx bxl-github",
            },
        ],
        fallbackLanguages: { JavaScript: 36890, CSS: 24972, HTML: 7450 },
    },
];

// GitHub's own linguist colors, so the distribution bar reads the same way the
// language strip on a repo page does.
export const languageColors = {
    Python: "#3572a5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    CSS: "#663399",
    HTML: "#e34c26",
    Shell: "#89e051",
    Makefile: "#427819",
    Mako: "#7e858d",
};

export const fallbackLanguageColor = "#6a6a7a";

export default projects;
