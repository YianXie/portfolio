import { useState } from "react";

import "../styles/Tsumego.css";
import Prompt from "./Prompt";

const COLUMNS = "ABCDEFGHJ";
const ROWS = [6, 5, 4, 3, 2, 1];
const SOLUTION = "E4";
const CAPTURED = ["D4", "D3", "E3"];

// Same geometry as the board in the GitHub profile README
const WIDTH = 408;
const HEIGHT = 284;
const pointX = (column) => 52 + COLUMNS.indexOf(column) * 40;
const pointY = (row) => 48 + (6 - row) * 40;

const START = {
    D6: "B",
    D5: "B",
    E5: "W",
    F5: "W",
    H5: "W",
    C4: "B",
    D4: "W",
    F4: "W",
    J4: "W",
    C3: "B",
    D3: "W",
    E3: "W",
    F3: "B",
    G3: "B",
    C2: "B",
    D2: "B",
    E2: "B",
};

function playOut(move) {
    const board = { ...START };
    if (move === SOLUTION) {
        CAPTURED.forEach((point) => delete board[point]);
        board[SOLUTION] = "B";
    } else if (move) {
        board[move] = "B";
        board[SOLUTION] = "W";
    }
    return board;
}

function describe(move) {
    if (move === SOLUTION) {
        return {
            command: `$ play black ${SOLUTION}`,
            response: `= captured ${CAPTURED.join(" ")}`,
            message:
                "The eye was false. D4, D3 and E3 had no liberty left except E4, and a capture resolves first, so the move is legal.",
        };
    }
    if (move) {
        return {
            command: `$ play black ${move}`,
            response: `= white ${SOLUTION}`,
            message: `White fills ${SOLUTION} and connects everything. Black had one chance. Reset and count liberties.`,
        };
    }
    return {
        command: "Black to play and kill.",
        response: "",
        message:
            "White looks like it has an eye. It doesn't. Click an intersection.",
    };
}

const percentStyle = (point) => ({
    left: `${(pointX(point[0]) / WIDTH) * 100}%`,
    top: `${(pointY(Number(point[1])) / HEIGHT) * 100}%`,
});

function Tsumego() {
    const [move, setMove] = useState(null);
    const board = playOut(move);
    const log = describe(move);

    const emptyPoints = move
        ? []
        : COLUMNS.split("").flatMap((column) =>
              ROWS.map((row) => `${column}${row}`).filter(
                  (point) => !board[point]
              )
          );

    return (
        <section
            className="tsumego"
            aria-labelledby="tsumego-heading"
            data-reveal="rise"
            style={{ "--d": "380ms" }}
        >
            <Prompt as="h2" id="tsumego-heading" className="tsumego-heading">
                cat ~/tsumego/today.txt
            </Prompt>

            <div className="tsumego-board">
                <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
                    {COLUMNS.split("").map((column) => (
                        <g key={column}>
                            <line
                                x1={pointX(column)}
                                y1="26"
                                x2={pointX(column)}
                                y2={pointY(1)}
                                className={
                                    column === "A" || column === "J"
                                        ? "is-edge"
                                        : ""
                                }
                            />
                            <text
                                x={pointX(column)}
                                y="274"
                                textAnchor="middle"
                            >
                                {column}
                            </text>
                        </g>
                    ))}
                    {ROWS.map((row) => (
                        <g key={row}>
                            <line
                                x1={pointX("A")}
                                y1={pointY(row)}
                                x2={pointX("J")}
                                y2={pointY(row)}
                                className={row === 1 ? "is-edge" : ""}
                            />
                            <text
                                x="22"
                                y={pointY(row) + 5}
                                textAnchor="middle"
                            >
                                {row}
                            </text>
                        </g>
                    ))}
                </svg>

                {Object.entries(board).map(([point, color]) => (
                    <div
                        key={point}
                        role="img"
                        aria-label={`${color === "B" ? "Black" : "White"} stone at ${point}`}
                        className={`tsumego-stone tsumego-stone--${color}${
                            point === move ? " is-last" : ""
                        }`}
                        style={percentStyle(point)}
                    ></div>
                ))}

                {emptyPoints.map((point) => (
                    <button
                        key={point}
                        type="button"
                        className="tsumego-point"
                        style={percentStyle(point)}
                        onClick={() => setMove(point)}
                        aria-label={`Play black at ${point}`}
                    ></button>
                ))}
            </div>

            <div className="tsumego-log" aria-live="polite">
                <p className="tsumego-command">{log.command}</p>
                <p className="tsumego-response">{log.response}</p>
                <p className="tsumego-message">{log.message}</p>
                {move === SOLUTION && (
                    <p className="tsumego-note">
                        This is the kind of why{" "}
                        <a
                            href="https://kifu-sensei.ai"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Kifu-Sensei
                        </a>{" "}
                        explains.
                    </p>
                )}
            </div>

            {move && (
                <button
                    type="button"
                    className="btn"
                    onClick={() => setMove(null)}
                >
                    reset position
                </button>
            )}
        </section>
    );
}

export default Tsumego;
