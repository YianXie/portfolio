import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import ContributionGraph from "../components/ContributionGraph";
import GameBoard from "../components/GameBoard";
import Prompt from "../components/Prompt";
import Section from "../components/Section";
import {
    awards,
    facts,
    featuredProjects,
    moves,
    nowLog,
    stack,
} from "../data/game";
import useMediaQuery, { PHONE_QUERY } from "../hooks/useMediaQuery";
import useOpening from "../hooks/useOpening";
import "../styles/Home.css";
import { stagger } from "../utils/motion";

const LAST_MOVE = moves.length;

function Typed({ text, delay }) {
    return (
        <span
            className="typed"
            style={{ "--n": text.length, "--type-delay": delay }}
        >
            {text}
        </span>
    );
}

function Home() {
    const [current, setCurrent] = useState(1);
    const isPhone = useMediaQuery(PHONE_QUERY);
    const boardRef = useRef(null);
    useOpening(boardRef);

    const selected = moves[current - 1];
    const side = current % 2 === 1 ? "black" : "white";

    const goTo = (move) => setCurrent(Math.min(LAST_MOVE, Math.max(1, move)));

    return (
        <>
            <div className="wrap hero">
                <div className="hero-intro">
                    <div>
                        <Prompt className="hero-command">
                            <Typed text="whoami" delay="0.45s" />
                        </Prompt>
                        <h1 className="hero-name">Yian (Ian) Xie</h1>
                        <p className="hero-roles">
                            SAS &apos;28 · Singapore · full-stack developer ·
                            FRC programming lead · Go player
                        </p>
                    </div>
                    <div>
                        <Prompt className="hero-command">
                            <Typed text="cat ~/.plan" delay="0.85s" />
                        </Prompt>
                        <p className="hero-plan">
                            Build software that is correct, ship it with a URL,
                            then write an AI that plays Go better than I do.
                        </p>
                    </div>
                </div>

                <div className="hero-board">
                    <GameBoard
                        ref={boardRef}
                        moves={moves}
                        current={current}
                        onSelect={goTo}
                    />
                    <div className="hero-legend">
                        <span>
                            black = built · white = recognized · click a stone
                        </span>
                        <span>
                            18. White to play.{" "}
                            <Link to="/contact">Your move.</Link>
                        </span>
                    </div>
                </div>

                <div className="hero-readout" aria-live="polite">
                    <Prompt className="hero-readout-command">
                        git show --move={selected.n}
                    </Prompt>
                    <div className="hero-readout-body" key={selected.n}>
                        <div className="hero-readout-meta">
                            <span
                                className={`hero-readout-stone hero-readout-stone--${side}`}
                                aria-hidden="true"
                            ></span>
                            <span>
                                {side} {selected.at}
                            </span>
                            <span>{selected.when}</span>
                        </div>
                        <h2 className="hero-readout-title">{selected.title}</h2>
                        <p className="hero-readout-text">
                            {selected.description}
                        </p>
                        {(selected.stack || selected.live) && (
                            <p className="hero-readout-stack">
                                {selected.stack}
                                {selected.stack && selected.live && " · "}
                                {selected.live && (
                                    <a
                                        href={selected.live.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {selected.live.label}
                                    </a>
                                )}
                            </p>
                        )}
                    </div>
                </div>

                <div className="hero-controls">
                    <button
                        type="button"
                        className="step step--edge"
                        onClick={() => goTo(1)}
                        aria-label="First move"
                    >
                        |&lt;
                    </button>
                    <button
                        type="button"
                        className="step"
                        onClick={() => goTo(current - 1)}
                        aria-label="Previous move"
                    >
                        &lt;<span className="step-word"> prev</span>
                    </button>
                    <span className="step-count">
                        {current}/{LAST_MOVE}
                    </span>
                    <button
                        type="button"
                        className="step step--next"
                        onClick={() => goTo(current + 1)}
                        aria-label="Next move"
                    >
                        <span className="step-word">next </span>&gt;
                    </button>
                    <button
                        type="button"
                        className="step step--edge"
                        onClick={() => goTo(LAST_MOVE)}
                        aria-label="Last move"
                    >
                        &gt;|
                    </button>
                    <Link className="btn hero-your-move" to="/contact">
                        your move →
                    </Link>
                </div>
            </div>

            <Section
                id="opening"
                stone="black"
                title="Opening"
                command="cat ~/about.txt"
            >
                <div className="opening">
                    <div className="opening-text">
                        <p data-reveal="rise">
                            Every Go game starts with a few quiet moves that
                            decide everything later. Mine were a calculator
                            website and a Pygame snake. Things escalated.
                        </p>
                        <p
                            className="opening-dim"
                            data-reveal="rise"
                            style={stagger(2)}
                        >
                            Today I build full-stack web apps, train neural
                            networks that play Go, and write the code that moves
                            a 55 kg robot. I care about software that is correct
                            and that people actually want to use, so most of my
                            projects ship with a live URL instead of just a
                            repo.
                        </p>
                    </div>
                    <dl className="facts" data-reveal="rise" style={stagger(3)}>
                        <span className="facts-label">a 9×9 of me</span>
                        {facts.map(([key, value]) => (
                            <div className="facts-row" key={key}>
                                <dt>{key}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </Section>

            <Section
                id="joseki"
                stone="white"
                title="Joseki"
                command="ls /usr/local/stack"
            >
                {stack.map(([group, items], index) => (
                    <div
                        className="stack-row"
                        key={group}
                        data-reveal="slide"
                        style={stagger(index, 80)}
                    >
                        <span className="stack-group">{group}/</span>
                        <span className="stack-items">{items}</span>
                    </div>
                ))}
            </Section>

            <Section
                id="middlegame"
                stone="black"
                title="Middlegame"
                command="ls ~/projects"
                aside={<Link to="/projects">open the full record →</Link>}
            >
                {featuredProjects.map((project, index) => (
                    <Link
                        className="row"
                        key={project.n}
                        to={`/projects#${project.anchor}`}
                        data-reveal="rise"
                        style={stagger(index)}
                    >
                        <span className="row-number">{project.n}</span>
                        <span className="row-text">
                            <span className="row-name">{project.title}</span>
                            <span className="row-desc">
                                {project.description}
                            </span>
                            <span className="row-meta">
                                {project.stack}
                                {!isPhone &&
                                    project.live &&
                                    ` · ${project.live.label}`}
                            </span>
                        </span>
                    </Link>
                ))}
            </Section>

            <Section
                id="reading-ahead"
                stone="white"
                title="Reading ahead"
                command="tail -f ~/now.log"
            >
                {nowLog.map((entry, index) => (
                    <div
                        className="log-row"
                        key={entry.topic}
                        data-reveal="slide"
                        style={stagger(index, 140)}
                    >
                        <span className="log-date">[{entry.date}]</span>
                        <span className="log-topic">{entry.topic}</span>
                        <span className="log-status">{entry.status}</span>
                    </div>
                ))}
                <span className="caret" aria-hidden="true"></span>
            </Section>

            <Section
                id="endgame"
                stone="black"
                title="Endgame"
                command={isPhone ? "git log --stat -n 19w" : "git log --stat"}
            >
                <ContributionGraph />
                <div className="awards">
                    {awards.map((award, index) => (
                        <div
                            className="award-row"
                            key={award.n}
                            data-reveal="rise"
                            style={stagger(index, 50)}
                        >
                            <span className="award-when">{award.when}</span>
                            <span className="award-title">{award.title}</span>
                            <span className="award-text">
                                {award.description}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            <section className="closing" aria-label="Contact">
                <div className="wrap closing-inner">
                    <p className="display" data-reveal="lines">
                        <span className="line">
                            <span>White to play.</span>
                        </span>
                        <span className="line">
                            <span style={{ "--d": "120ms" }}>Your move.</span>
                        </span>
                    </p>
                    <div
                        className="closing-actions"
                        data-reveal="rise"
                        style={stagger(4)}
                    >
                        <Link className="btn btn--primary" to="/contact">
                            mail ian
                        </Link>
                        <a
                            className="closing-link"
                            href="mailto:yianxie52@gmail.com"
                        >
                            yianxie52@gmail.com
                        </a>
                        <a
                            className="closing-link"
                            href="https://github.com/YianXie"
                            target="_blank"
                            rel="noreferrer"
                        >
                            github.com/YianXie
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
