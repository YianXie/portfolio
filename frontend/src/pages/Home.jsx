import { useEffect, useState } from "react";

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
                <div>
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
            </section>

            <section id="about">
                <div>
                    <h1>About me</h1>
                    <hr />
                </div>
                <div className="about-me">
                    <img src="/images/image-2.jpg" alt="image-2.jpg" />
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
                        <h1>Awards & Experience</h1>
                        <hr />
                    </div>
                    <div className="awards-experience-grid">
                        <article className="experience-card" data-type="award">
                            <span className="card-badge">Award</span>
                            <div className="card-icon">
                                <i className="bx bx-trophy"></i>
                            </div>
                            <h3>2nd Place — Hackathon</h3>
                            <p className="card-meta">Hackathon competition</p>
                            <p className="card-desc">
                                Placed 2nd in a hackathon, building a full-stack
                                project with my team.
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
                    </div>
                </div>
            </section>

            <section id="coding">
                <div>
                    <h1>Programming languages</h1>
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
                <img src="/images/image-3.jpg" alt="image-3.jpg" />
            </section>
        </>
    );
}

export default Home;
