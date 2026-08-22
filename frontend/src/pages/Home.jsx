import { useEffect, useState } from "react";

import ContributionGraph from "../components/ContributionGraph";
import "../styles/Home.css";

function Home() {
    const [roleText, setRoleText] = useState("");
    const roles = [
        "SAS Student",
        "UI/UX Designer",
        "Web-developer",
        "Go Player",
        "Badminton Player",
        "Machine Learner",
    ];

    useEffect(() => {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const typeRole = () => {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                // Typing
                if (charIndex < currentRole.length) {
                    setRoleText(currentRole.substring(0, charIndex + 1));
                    charIndex++;
                    timeoutId = setTimeout(typeRole, 75);
                } else {
                    // Wait before deleting
                    timeoutId = setTimeout(() => {
                        isDeleting = true;
                        typeRole();
                    }, 750);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setRoleText(currentRole.substring(0, charIndex - 1));
                    charIndex--;
                    timeoutId = setTimeout(typeRole, 40);
                } else {
                    // Move to next role
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    timeoutId = setTimeout(typeRole, 500);
                }
            }
        };

        typeRole();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToAbout = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section id="intro">
                <div className="intro-text">
                    <h1>Hello!</h1>
                    <h2>My name is Ian Xie. I am a:</h2>
                    <h2 id="dynamic-role" className="dynamic-role">
                        {roleText}
                    </h2>

                    <div className="btn" onClick={scrollToAbout}>
                        <button className="intro-btn">About Me</button>
                        <i className="bx bx-down-arrow-alt"></i>
                    </div>
                </div>

                <ContributionGraph />
            </section>

            <section id="about">
                <div>
                    <h2>About me</h2>
                    <hr />
                </div>
                <div className="about-me">
                    <img src="/images/image-2.jpg" alt="Portrait of Yian (Ian) Xie" />
                    <div>
                        <p>
                            I am a high school student with a passion for web
                            development and machine learning. Starting from
                            middle school, I am able to develop full-stack
                            websites from scratch. As a Go player, I was
                            fascinated of the complex strategy behind, leading
                            me to build my own{" "}
                            <a href="https://github.com/YianXie/Mini-KataGo">
                                Go engine
                            </a>
                            .
                            <br />
                            <br />
                            In addition to coding, I also love playing badminton
                            and{" "}
                            <a href="https://en.wikipedia.org/wiki/Go_(game)">
                                Chinese Weiqi
                            </a>
                            ! In fact, I won 1st place in the 32nd Qiuping Cup
                            Senior Group — A national Weiqi competition in
                            Singapore.
                        </p>
                    </div>
                </div>
            </section>

            <section id="awards-experience">
                <div className="awards-experience-inner">
                    <div>
                        <h2>Awards & Experience</h2>
                        <hr />
                    </div>
                    <div className="awards-experience-grid">
                        <article className="experience-card" data-type="award">
                            <span className="card-badge">Award</span>
                            <div className="card-icon">
                                <i className="bx bx-trophy"></i>
                            </div>
                            <h3>2nd Place — Hackathon</h3>
                            <p className="card-meta">
                                SAS 2025 Highschool CSHS Hackathon
                            </p>
                            <p className="card-desc">
                                Placed 2nd in the hackathon with my PathFinder
                                project, a full-stack web application that helps
                                SAS students to choose their extracurricular
                                activities.
                            </p>
                        </article>
                        <article
                            className="experience-card"
                            data-type="experience"
                        >
                            <span className="card-badge">Experience</span>
                            <div className="card-icon">
                                <i className="bx bx-briefcase"></i>
                            </div>
                            <h3>Internship Program</h3>
                            <p className="card-meta">Adobe</p>
                            <p className="card-desc">
                                Participated in Adobe&apos;s internship program,
                                gaining industry experience in design and
                                development.
                            </p>
                        </article>
                        <article className="experience-card" data-type="award">
                            <span className="card-badge">Award</span>
                            <div className="card-icon">
                                <i className="bx bx-medal"></i>
                            </div>
                            <h3>USACO Silver</h3>
                            <p className="card-meta">USA Computing Olympiad</p>
                            <p className="card-desc">
                                Got promoted to the silver division in the 2026
                                USACO third contest.
                            </p>
                        </article>
                        <article className="experience-card" data-type="award">
                            <span className="card-badge">Award</span>
                            <div className="card-icon">
                                <i className="bx bx-award"></i>
                            </div>
                            <h3>SIL Gold</h3>
                            <p className="card-meta">
                                2026 Singapore Informatics League
                            </p>
                            <p className="card-desc">
                                Earned a Gold award in the 2026 Singapore
                                Informatics League, a team-based competitive
                                programming contest held in Singapore.
                            </p>
                        </article>
                        <article
                            className="experience-card"
                            data-type="experience"
                        >
                            <span className="card-badge">Experience</span>
                            <div className="card-icon">
                                <i className="bx bx-book-open"></i>
                            </div>
                            <h3>Pre-College Scholar</h3>
                            <p className="card-meta">
                                UC Berkeley — Summer 2026
                            </p>
                            <p className="card-desc">
                                Studied CS61C (Great Ideas in Computer
                                Architecture) and CS70 (Discrete Mathematics and
                                Probability Theory) at UC Berkeley, earning an A
                                and a B+ respectively.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="coding">
                <div>
                    <h2>Programming languages</h2>
                    <div>
                        <label htmlFor="html">HTML</label>
                        <progress value="90" max="100" id="html"></progress>
                    </div>
                    <div>
                        <label htmlFor="css">CSS</label>
                        <progress value="90" max="100" id="css"></progress>
                    </div>
                    <div>
                        <label htmlFor="js">JavaScript</label>
                        <progress value="80" max="100" id="js"></progress>
                    </div>
                    <div>
                        <label htmlFor="python">Python</label>
                        <progress value="80" max="100" id="python"></progress>
                    </div>
                    <div>
                        <label htmlFor="react">React / Node.js</label>
                        <progress value="60" max="100" id="react"></progress>
                    </div>
                    <small>
                        *My proficiency level in different programming languages
                    </small>
                </div>
                <img src="/images/image-3.jpg" alt="HTML5, CSS3 and JavaScript logos" />
            </section>
        </>
    );
}

export default Home;
