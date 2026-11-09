import { Link } from "react-router-dom";

import { COLUMNS, NEXT_MOVE, STAR_POINTS, pointPosition } from "../data/game";
import "../styles/GameBoard.css";

const LINE_POSITIONS = COLUMNS.split("").map((_, index) => 5 + index * 5);
const CENTER_LINE = 9;

function starCenter(point) {
    const { left, top } = pointPosition(point);
    return { cx: parseFloat(left), cy: parseFloat(top) };
}

function GameBoard({ moves, current, onSelect, ref }) {
    return (
        <div className="goban" ref={ref}>
            <svg
                className="goban-lines"
                viewBox="0 0 100 100"
                aria-hidden="true"
            >
                {LINE_POSITIONS.map((position, index) => {
                    // Lines draw outward from the center of the board
                    const order = { "--i": Math.abs(index - CENTER_LINE) };

                    return (
                        <g key={position}>
                            <line
                                x1={position}
                                y1="5"
                                x2={position}
                                y2="95"
                                style={order}
                            />
                            <line
                                x1="5"
                                y1={position}
                                x2="95"
                                y2={position}
                                style={order}
                            />
                            <text x={position} y="2.9" textAnchor="middle">
                                {COLUMNS[index]}
                            </text>
                            <text
                                x="2.2"
                                y={position + 0.5}
                                textAnchor="middle"
                            >
                                {19 - index}
                            </text>
                        </g>
                    );
                })}
                {STAR_POINTS.map((point) => (
                    <circle key={point} r="0.5" {...starCenter(point)} />
                ))}
            </svg>

            <Link
                className="goban-next"
                to="/contact"
                style={pointPosition(NEXT_MOVE.at)}
                aria-label={`Move ${NEXT_MOVE.n}, White to play. Your move: go to contact.`}
            >
                {NEXT_MOVE.n}
            </Link>

            {moves.map((move) => {
                const side = move.n % 2 === 1 ? "black" : "white";
                const state =
                    move.n === current
                        ? " is-current"
                        : move.n > current
                          ? " is-future"
                          : "";

                return (
                    <button
                        key={move.n}
                        type="button"
                        className={`goban-stone goban-stone--${side}${state}`}
                        style={{ ...pointPosition(move.at), "--i": move.n }}
                        onClick={() => onSelect(move.n)}
                        aria-label={`Move ${move.n}, ${side} ${move.at}: ${move.title}`}
                        aria-pressed={move.n === current}
                    >
                        <span>{move.n}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default GameBoard;
