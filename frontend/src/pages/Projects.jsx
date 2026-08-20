import { useEffect, useState } from "react";

import projects, {
    fallbackLanguageColor,
    languageColors,
} from "../data/projects";
import "../styles/Projects.css";

const getLanguagePercentages = (langs) => {
    if (!langs || Object.keys(langs).length === 0) return [];

    const total = Object.values(langs).reduce((sum, val) => sum + val, 0);
    if (total === 0) return [];

    return Object.entries(langs)
        .map(([name, bytes]) => ({
            name,
            color: languageColors[name] || fallbackLanguageColor,
            percentage: ((bytes / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3); // Top 3 languages
};

function Projects() {
    // Seed with the checked-in byte counts so the cards never render empty,
    // then replace them with live numbers once GitHub answers.
    const [languageData, setLanguageData] = useState(() =>
        Object.fromEntries(
            projects.map((project) => [project.id, project.fallbackLanguages])
        )
    );

    useEffect(() => {
        let cancelled = false;

        const fetchLanguages = async () => {
            const results = await Promise.all(
                projects.map(async (project) => {
                    try {
                        const response = await fetch(
                            `https://api.github.com/repos/${project.owner}/${project.repo}/languages`
                        );
                        if (!response.ok) throw new Error(response.statusText);

                        const data = await response.json();
                        if (!data || Object.keys(data).length === 0)
                            return null;

                        return [project.id, data];
                    } catch (error) {
                        // Rate limited (60 requests/hour unauthenticated) or
                        // offline. Handled, not broken — the fallback counts
                        // stay on screen, so this is a warning, not an error.
                        console.warn(
                            `Falling back to checked-in language counts for ${project.repo}:`,
                            error
                        );
                        return null;
                    }
                })
            );

            if (cancelled) return;

            const fetched = Object.fromEntries(results.filter(Boolean));
            if (Object.keys(fetched).length > 0) {
                setLanguageData((prev) => ({ ...prev, ...fetched }));
            }
        };

        fetchLanguages();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <h1>Projects</h1>
            <hr />
            <div className="intro">
                <h2>About these projects</h2>
                <p>
                    These are the four projects I am proudest of — a Go engine
                    trained from scratch, an LLM commentary generator, a club
                    recommender, and a browser extension.
                    <br />
                    All of them are open source, and every one can be found on{" "}
                    <a
                        href="https://github.com/YianXie"
                        target="_blank"
                        rel="noreferrer"
                    >
                        my GitHub
                    </a>
                    .
                </p>
            </div>

            <div className="projects">
                {projects.map((project) => {
                    const langPercentages = getLanguagePercentages(
                        languageData[project.id]
                    );

                    return (
                        <article key={project.id} className="project-card">
                            <div className="project-shot">
                                {project.screenshot ? (
                                    <img
                                        src={project.screenshot}
                                        alt={`Screenshot of ${project.name}`}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="project-shot-placeholder"
                                        aria-hidden="true"
                                    >
                                        <img src={project.icon} alt="" />
                                    </div>
                                )}
                                {project.highlight && (
                                    <span className="project-highlight">
                                        {project.highlight}
                                    </span>
                                )}
                            </div>

                            <div className="project-body">
                                <header className="project-head">
                                    <img
                                        className="project-icon"
                                        src={project.icon}
                                        alt=""
                                    />
                                    <h3>{project.name}</h3>
                                </header>

                                <p className="project-desc">
                                    {project.description}
                                </p>

                                <div className="project-langs">
                                    <div
                                        className="lang-bar"
                                        role="img"
                                        aria-label={`Language distribution: ${langPercentages
                                            .map(
                                                (lang) =>
                                                    `${lang.name} ${lang.percentage}%`
                                            )
                                            .join(", ")}`}
                                    >
                                        {langPercentages.map((lang) => (
                                            <span
                                                key={lang.name}
                                                style={{
                                                    width: `${lang.percentage}%`,
                                                    background: lang.color,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="language-info">
                                        {langPercentages.map((lang) => (
                                            <span
                                                key={lang.name}
                                                className="language-badge"
                                            >
                                                <i
                                                    className="lang-dot"
                                                    style={{
                                                        background: lang.color,
                                                    }}
                                                />
                                                {lang.name}: {lang.percentage}%
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-links">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.href}
                                            className={`project-link${
                                                link.primary ? " primary" : ""
                                            }`}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className={link.icon}></i>
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="projects-footer">
                <p>Want to see what else I have been building?</p>
                <a
                    className="projects-footer-link"
                    href="https://github.com/YianXie"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i className="bx bxl-github"></i>
                    View all my repositories on GitHub
                </a>
            </div>
        </>
    );
}

export default Projects;
