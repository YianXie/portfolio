import { Link, useLocation } from "react-router-dom";

import "../styles/Footer.css";
import Prompt from "./Prompt";

function Footer() {
    const { pathname } = useLocation();

    if (pathname === "/projects") {
        return (
            <footer className="site-footer">
                <div className="wrap site-footer-inner">
                    <Prompt path="~/projects">
                        <Link to="/contact">cd ../contact</Link>
                    </Prompt>
                </div>
            </footer>
        );
    }

    if (pathname !== "/" && pathname !== "/contact") return null;

    return (
        <footer
            className={`site-footer${pathname === "/" ? " site-footer--flush" : ""}`}
        >
            <div className="wrap site-footer-inner">
                <Prompt className="site-footer-exit">
                    echo &quot;Thanks for reading. Let&apos;s build
                    something.&quot; &amp;&amp; exit
                </Prompt>
            </div>
        </footer>
    );
}

export default Footer;
