import { useEffect, useState } from "react";

import Prompt from "../components/Prompt";
import Section from "../components/Section";
import projects, { miscProjects, moreProjects } from "../data/projects";
import "../styles/Projects.css";
import { stagger } from "../utils/motion";

const MIN_LANGUAGE_SHARE = 0.5;

const getLanguagePercentages = (langs) => {
    if (!langs || Object.keys(langs).length === 0) return [];

    const total = Object.values(langs).reduce((sum, val) => sum + val, 0);
    if (total === 0) return [];

    return Object.entries(langs)
        .map(([name, bytes]) => ({
            name,
            percentage: (bytes / total) * 100,
        }))
        .filter((lang) => lang.percentage >= MIN_LANGUAGE_SHARE)
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
            <header className="wrap projects-header">
                <Prompt path="~/projects" className="projects-command">
                    ls
                </Prompt>
                <h1 className="display" data-reveal="lines">
                    <span className="line">
                        <span>Middlegame</span>
                    </span>
                </h1>
                <p
                    className="projects-intro"
                    data-reveal="rise"
                    style={stagger(3)}
                >
                    Black stones from the board. Numbers match the moves on the
                    home page, and most of them ship with a live URL instead of
                    just a repo.
                </p>
            </header>

            {projects.map((project) => (
                <article className="project" id={project.id} key={project.id}>
                    <div className="wrap project-inner">
                        <div className="project-text">
                            <div className="project-meta" data-reveal="stone">
                                <span
                                    className="project-stone"
                                    aria-hidden="true"
                                >
                                    {project.move}
                                </span>
                                <span className="project-highlight">
                                    {project.highlight}
                                </span>
                            </div>
                            <h2
                                className="project-name"
                                data-reveal="rise"
                                style={stagger(1)}
                            >
                                {project.name}
                            </h2>
                            <p
                                className="project-desc"
                                data-reveal="rise"
                                style={stagger(2)}
                            >
                                {project.description}
                            </p>

                            <dl className="langs" data-reveal="bars">
                                {getLanguagePercentages(
                                    languageData[project.id]
                                ).map((lang) => (
                                    <div className="lang" key={lang.name}>
                                        <dt>{lang.name}</dt>
                                        <span
                                            className="lang-track"
                                            aria-hidden="true"
                                        >
                                            <span
                                                className="lang-fill"
                                                style={{
                                                    width: `${lang.percentage}%`,
                                                }}
                                            ></span>
                                        </span>
                                        <dd>{lang.percentage.toFixed(1)}%</dd>
                                    </div>
                                ))}
                            </dl>

                            <div
                                className="btn-row"
                                data-reveal="rise"
                                style={stagger(3)}
                            >
                                {project.links.map((link) => (
                                    <a
                                        key={link.href}
                                        className={`btn${
                                            link.primary ? " btn--primary" : ""
                                        }`}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <figure className="project-shot" data-reveal="wipe">
                            <figcaption>{project.caption}</figcaption>
                            <img
                                src={project.screenshot}
                                alt={project.screenshotAlt}
                                width="1440"
                                height="810"
                                loading="lazy"
                            />
                        </figure>
                    </div>
                </article>
            ))}

            <Section
                id="more-moves"
                title="More moves"
                command="ls -1 ~/projects/recent"
            >
                {moreProjects.map((project, index) => (
                    <a
                        className="row"
                        data-reveal="rise"
                        style={stagger(index)}
                        id={project.id}
                        key={project.id}
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="row-number">{project.move}</span>
                        <span className="row-text">
                            <span className="row-name">{project.name}</span>
                            <span className="row-desc">
                                {project.description}
                            </span>
                            <span className="row-meta">{project.stack}</span>
                        </span>
                    </a>
                ))}
            </Section>

            <Section id="tsumego" title="Tsumego" command="ls ~/projects/misc">
                <div className="misc">
                    {miscProjects.map((project, index) => (
                        <div
                            className="misc-item"
                            key={project.name}
                            data-reveal="rise"
                            style={stagger(index, 40)}
                        >
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {project.name}
                            </a>
                            <span>{project.description}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </>
    );
}

export default Projects;
