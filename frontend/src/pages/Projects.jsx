import { useEffect, useState } from "react";

import "../styles/Projects.css";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [languageData, setLanguageData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/users/YianXie/repos"
                );
                const data = await response.json();
                setRepos(data.filter((repo) => !repo.archived));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching repos:", error);
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const fetchLanguages = async (url, repoName) => {
        if (languageData[repoName]) return; // Already fetched

        try {
            const response = await fetch(url);
            const data = await response.json();
            setLanguageData((prev) => ({ ...prev, [repoName]: data }));
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const getLanguagePercentages = (langs) => {
        if (!langs || Object.keys(langs).length === 0) return [];

        const total = Object.values(langs).reduce((sum, val) => sum + val, 0);
        return Object.entries(langs)
            .map(([name, bytes]) => ({
                name,
                percentage: ((bytes / total) * 100).toFixed(1),
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3); // Top 3 languages
    };

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <>
            <h1>Projects</h1>
            <hr />
            <div className="intro">
                <h2>About these projects</h2>
                <p>
                    These are some of the projects I have worked on, including
                    websites, games, and AI engines.
                    <br />
                    All of them can be found on my GitHub account.
                </p>
            </div>

            <div className="projects">
                {repos.map((repo) => {
                    const langs = languageData[repo.name];
                    const langPercentages = getLanguagePercentages(langs);

                    return (
                        <div
                            key={repo.id}
                            className="repo"
                            onClick={() => window.open(repo.html_url)}
                            onMouseEnter={() =>
                                fetchLanguages(repo.languages_url, repo.name)
                            }
                            title="Click to go to GitHub"
                        >
                            <div>
                                <h3 className="name">{repo.name}</h3>
                                <p className="description">
                                    {repo.description || "No description yet"}
                                </p>
                            </div>
                            <div className="language-info">
                                {langPercentages.length > 0 ? (
                                    langPercentages.map((lang, idx) => (
                                        <span
                                            key={idx}
                                            className="language-badge"
                                        >
                                            {lang.name}: {lang.percentage}%
                                        </span>
                                    ))
                                ) : (
                                    <span className="language-badge">
                                        Loading...
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Projects;
