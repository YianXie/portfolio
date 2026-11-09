// The home page board: the portfolio told as a game record. Odd moves are black
// (things built), even moves are white (things recognized), so `n` also decides
// the stone color. `at` is a point in standard Go notation, which skips "I".
export const COLUMNS = "ABCDEFGHJKLMNOPQRST";
export const STAR_POINTS = [
    "D4",
    "K4",
    "Q4",
    "D10",
    "K10",
    "Q10",
    "D16",
    "K16",
    "Q16",
];
export const NEXT_MOVE = { n: 18, at: "K16" };

// Lines sit at 5%, 10%, ... 95% of the board in both directions
export const pointPosition = (point) => ({
    left: `${5 + COLUMNS.indexOf(point[0]) * 5}%`,
    top: `${5 + (19 - Number(point.slice(1))) * 5}%`,
});

export const moves = [
    {
        n: 1,
        at: "Q16",
        title: "Calculator website",
        when: "the beginning",
        description: "The first quiet move.",
    },
    {
        n: 2,
        at: "D16",
        title: "Senior Group Champion",
        when: "32nd Qiuping Cup",
        description:
            "1st place in the Senior Group of a national Weiqi competition in Singapore.",
        stack: "Pesta Sukan",
    },
    {
        n: 3,
        at: "Q4",
        title: "Pygame snake",
        when: "the beginning",
        description: "The second quiet move. Things escalated.",
        stack: "Pygame",
    },
    {
        n: 4,
        at: "D4",
        title: "FRC programming lead",
        when: "SAS robotics",
        description: "Writes the code that moves a 55 kg robot.",
        stack: "Java · WPILib",
    },
    {
        n: 5,
        at: "F17",
        title: "LucidGo",
        when: "2025-08",
        description: "Open-source web app for visually analysing Go games.",
        stack: "React · TS · Django REST",
        live: { label: "lucidgo.org", href: "https://lucidgo.org" },
        anchor: "lucidgo",
    },
    {
        n: 6,
        at: "C14",
        title: "CSHS Member",
        when: "SAS",
        description: "Member of the SAS Computer Science Honor Society.",
    },
    {
        n: 7,
        at: "J17",
        title: "path-finder",
        when: "2025-10",
        description:
            "Hackathon project: AI agents that help SAS students pick activities that fit their interests.",
        stack: "React · MUI · Django REST",
        live: {
            label: "sas-pathfinder.org",
            href: "https://www.sas-pathfinder.org",
        },
        anchor: "pathfinder",
    },
    {
        n: 8,
        at: "R6",
        title: "2nd Place, SAS CSHS Hackathon",
        when: "2025",
        description:
            "Placed 2nd with PathFinder at the SAS 2025 High School CSHS Hackathon.",
    },
    {
        n: 9,
        at: "O3",
        title: "better-usaco",
        when: "2025-11",
        description:
            "Chrome extension that gives usaco.org a dark theme and quality-of-life features. 500+ installs.",
        stack: "JavaScript",
        live: {
            label: "Chrome Web Store",
            href: "https://chromewebstore.google.com/detail/better-usaco/mcmnjckmjhifcbfcakbpiedemkmdgahn",
        },
        anchor: "better-usaco",
    },
    {
        n: 10,
        at: "R9",
        title: "USACO Silver",
        when: "2026",
        description:
            "Promoted to the Silver division in the 2026 third contest.",
    },
    {
        n: 11,
        at: "C6",
        title: "LucidTree",
        when: "2025-12",
        description:
            "AlphaZero-style Go engine: a policy/value network guiding Monte Carlo Tree Search, trained from self-play.",
        stack: "PyTorch · Python",
        anchor: "lucidtree",
    },
    {
        n: 12,
        at: "F3",
        title: "SIL Gold",
        when: "2026",
        description:
            "Gold award in the Singapore Informatics League, a team-based competitive programming contest.",
    },
    {
        n: 13,
        at: "C9",
        title: "Kifu-Sensei",
        when: "2026-05",
        description:
            "LLM-powered commentary for Go games: upload a kifu, get a review written like a human teacher.",
        stack: "FastAPI · TypeScript · LLMs",
        live: { label: "kifu-sensei.ai", href: "https://kifu-sensei.ai" },
        anchor: "kifu-sensei",
    },
    {
        n: 14,
        at: "J3",
        title: "Internship Program",
        when: "Adobe",
        description: "Industry experience in design and development.",
    },
    {
        n: 15,
        at: "O17",
        title: "Stable-Sponsors",
        when: "2026-09",
        description:
            "Constraint-based reallocation of interim-semester sponsor matching, comparing CP-SAT objectives with deferred acceptance.",
        stack: "Python · OR-Tools",
        anchor: "stable-sponsors",
    },
    {
        n: 16,
        at: "R12",
        title: "Pre-College Scholar",
        when: "Summer 2026",
        description:
            "Studied CS61C and CS70 at UC Berkeley, earning an A and a B+.",
    },
    {
        n: 17,
        at: "K10",
        title: "ReLuminate-Echo",
        when: "2026-09",
        description:
            "An audio-first beacon-hunt game for youth with visual impairments, part of ReLuminate.",
        stack: "TypeScript",
        live: {
            label: "play.reluminate-global.org",
            href: "https://play.reluminate-global.org",
        },
        anchor: "reluminate-echo",
    },
];

const moveNumbered = (n) => moves[n - 1];

export const featuredProjects = [11, 13, 9, 5, 7, 15, 17].map(moveNumbered);

export const awards = [
    { n: 16, when: "2026" },
    { n: 14, when: "Adobe" },
    { n: 12, when: "2026" },
    { n: 10, when: "2026" },
    { n: 8, when: "2025" },
    { n: 6, when: "SAS" },
    { n: 4, when: "FRC" },
    { n: 2, when: "Qiuping" },
].map(({ n, when }) => ({ ...moveNumbered(n), when }));

export const facts = [
    ["school", "Singapore American School · class of 2028"],
    ["robots", "programming lead, SAS FRC · Java / WPILib"],
    ["web", "React · TypeScript · Django · FastAPI · Postgres"],
    ["ml", "PyTorch · MCTS · LLM apps"],
    ["go", "Senior Group Champion, Qiuping Cup (Pesta Sukan)"],
    ["home", "Singapore, formerly Beijing"],
];

export const stack = [
    ["lang", "Python TypeScript JavaScript Java C++"],
    ["web", "React Vite Tailwind MUI Django FastAPI PostgreSQL SQLite"],
    ["ml", "PyTorch MCTS LLM-apps"],
    ["ops", "AWS Cloudflare Linux Git GitHub Postman"],
];

export const nowLog = [
    {
        date: "2026-11",
        topic: "Stable-Sponsors",
        status: "finishing the allocation comparison and write-up (Catalyst)",
    },
    {
        date: "2026-11",
        topic: "FRC 2026 offseason",
        status: "vision subsystem done → next: elevator",
    },
    { date: "2026-11", topic: "badminton", status: "training" },
];
