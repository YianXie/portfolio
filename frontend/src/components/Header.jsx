import { NavLink } from "react-router-dom";

import "../styles/Header.css";

const TABS = [
    { to: "/", index: 0, label: "home" },
    { to: "/projects", index: 1, label: "projects" },
    { to: "/contact", index: 2, label: "contact" },
];

// Styled as a tmux status line: window list on the left, session info right
function Header() {
    return (
        <nav className="status-bar" aria-label="Primary">
            <div className="status-windows">
                <span className="status-session">[19x19]</span>
                {TABS.map(({ to, index, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) =>
                            `status-tab${isActive ? " is-active" : ""}`
                        }
                    >
                        {({ isActive }) =>
                            `${index}:${label}${isActive ? "*" : ""}`
                        }
                    </NavLink>
                ))}
            </div>
            <a
                className="status-tab status-github"
                href="https://github.com/YianXie"
                target="_blank"
                rel="noreferrer"
            >
                github.com/YianXie
            </a>
        </nav>
    );
}

export default Header;
