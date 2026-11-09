import { Link, useLocation } from "react-router-dom";

import Prompt from "../components/Prompt";
import "../styles/NotFound.css";

const LINES = [10, 30, 50, 70, 90];
const WHITE_STONES = [
    { left: "50%", top: "30%" },
    { left: "30%", top: "50%" },
    { left: "70%", top: "50%" },
    { left: "50%", top: "70%" },
];

function NotFound() {
    const { pathname } = useLocation();

    return (
        <div className="wrap not-found">
            <div className="not-found-text">
                <Prompt className="not-found-command">
                    play black {pathname}
                </Prompt>
                <p className="not-found-error">? illegal move</p>
                <h1 className="display" data-reveal="lines">
                    <span className="line">
                        <span>No liberties.</span>
                    </span>
                </h1>
                <p className="not-found-note">
                    This page is not on the board. 404.
                </p>
                <div className="btn-row not-found-actions">
                    <Link className="btn btn--primary" to="/">
                        cd ~
                    </Link>
                    <Link className="btn" to="/projects">
                        ls ~/projects
                    </Link>
                </div>
            </div>

            <div
                className="not-found-board"
                data-reveal="rise"
                style={{ "--d": "180ms" }}
                role="img"
                aria-label="A black stone that cannot be played: the point is surrounded by four white stones."
            >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                    {LINES.map((position) => (
                        <g key={position}>
                            <line x1={position} y1="10" x2={position} y2="90" />
                            <line x1="10" y1={position} x2="90" y2={position} />
                        </g>
                    ))}
                </svg>
                {WHITE_STONES.map((position) => (
                    <div
                        className="not-found-stone"
                        key={`${position.left}-${position.top}`}
                        style={position}
                    ></div>
                ))}
                <div className="not-found-stone not-found-stone--illegal"></div>
            </div>
        </div>
    );
}

export default NotFound;
