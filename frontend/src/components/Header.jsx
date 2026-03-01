import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Header.css";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest("#mobile-burger") &&
                !e.target.closest("#mobile-burger-menu")
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header>
                <nav className={isScrolled ? "scroll" : ""}>
                    <Link to="/" title="Home">
                        Ian's Portfolio
                    </Link>
                    <Link to="/projects" className="hide-mobile">
                        Projects
                    </Link>
                    <Link to="/blog" className="hide-mobile">
                        Blog
                    </Link>
                    <Link to="/contact" className="hide-mobile">
                        Contacts
                    </Link>
                    <i
                        className="bxl bx-github hide-mobile"
                        onClick={() => {
                            window.open("https://github.com/YianXie", "_blank");
                        }}
                    ></i>
                    <i
                        className="bx bx-list-ul show-mobile"
                        id="mobile-burger-menu"
                        onClick={toggleMobileMenu}
                    ></i>
                </nav>
            </header>

            <div
                id="mobile-burger"
                className={isMobileMenuOpen ? "active" : ""}
            >
                <i
                    className="bx bx-x"
                    id="close-mobile-burger"
                    onClick={toggleMobileMenu}
                ></i>
                <ul>
                    <li>
                        <Link to="/projects" onClick={toggleMobileMenu}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" onClick={toggleMobileMenu}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleMobileMenu}>
                            Contacts
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com/YianXie/portfolio">
                            GitHub repository
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;
