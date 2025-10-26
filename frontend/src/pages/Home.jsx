import { useEffect, useState } from "react";

import "./Home.css";

function Home() {
    const [roleText, setRoleText] = useState("");
    const roles = [
        "SAS Student",
        "Game designer",
        "Programmer",
        "Web-developer",
        "Badminton player",
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
    }, []);

    const scrollToAbout = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToTop = () => {
        document
            .getElementById("intro")
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
                            development. I have some experiences in mostly
                            front-end but also back-end development. I am
                            proficient in HTML, CSS, and JavaScript, as well as
                            some Python. I am also familiar with React and
                            Node.js. I am always eager to learn new technologies
                            and improve my skills.
                            <br />
                            <br />
                            In addition to coding, I also love playing badminton
                            and{" "}
                            <a href="https://en.wikipedia.org/wiki/Go_(game)">
                                Chinese Weiqi
                            </a>
                            ! As a member of JV Blue school badminton team, I
                            train 3 times a week, along with one extra session I
                            have on each Saturday outside of school.
                        </p>
                    </div>
                </div>
            </section>

            <section id="coding">
                <div>
                    <h1>Programming languages</h1>
                    <div>
                        <label htmlFor="html">HTML</label>
                        <progress value="90" max="100" id="html">
                            90%
                        </progress>
                    </div>
                    <div>
                        <label htmlFor="css">CSS</label>
                        <progress value="90" max="100" id="css">
                            90%
                        </progress>
                    </div>
                    <div>
                        <label htmlFor="js">JavaScript</label>
                        <progress value="80" max="100" id="js">
                            80%
                        </progress>
                    </div>
                    <div>
                        <label htmlFor="python">Python</label>
                        <progress value="60" max="100" id="python">
                            60%
                        </progress>
                    </div>
                    <div>
                        <label htmlFor="react">React / Node.js</label>
                        <progress value="50" max="100" id="react">
                            50%
                        </progress>
                    </div>
                    <small>
                        *My proficiency level in different programming languages
                    </small>
                </div>
                <img src="/images/image-3.jpg" alt="image-3.jpg" />
            </section>

            <section id="social-media">
                <h1>Connect with me</h1>
                <div className="socials">
                    <div>
                        <i
                            className="bx bxl-github"
                            onClick={() =>
                                window.open("https://github.com/YianXie")
                            }
                        ></i>
                        <p>GitHub</p>
                    </div>
                    <div>
                        <i
                            className="bx bxl-instagram-alt"
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/xya_ian_sg/"
                                )
                            }
                        ></i>
                        <p>Instagram</p>
                    </div>
                    <div>
                        <i
                            className="bx bxs-envelope"
                            onClick={() =>
                                window.open("mailto:yianxie52@gmail.com")
                            }
                        ></i>
                        <p>Email</p>
                    </div>
                </div>

                <div className="btn" onClick={scrollToTop}>
                    <button>Back to the top</button>
                    <i className="bx bx-up-arrow-alt" id="arrow-up"></i>
                </div>
            </section>
        </>
    );
}

export default Home;
