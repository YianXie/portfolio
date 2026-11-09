import "../styles/Section.css";

function Section({ id, stone, title, command, aside, children }) {
    const headingId = `heading-${id}`;

    return (
        <section className="section" id={id} aria-labelledby={headingId}>
            <div className="wrap section-inner">
                <div className="section-head">
                    {stone && (
                        <span
                            className={`section-stone section-stone--${stone}`}
                            data-reveal="stone"
                            aria-hidden="true"
                        ></span>
                    )}
                    <h2
                        id={headingId}
                        className="section-title"
                        data-reveal="rise"
                        style={{ "--d": "60ms" }}
                    >
                        {title}
                    </h2>
                    <p
                        className="section-command"
                        data-reveal="rise"
                        style={{ "--d": "120ms" }}
                    >
                        $ {command}
                    </p>
                    {aside && (
                        <div
                            className="section-aside"
                            data-reveal="rise"
                            style={{ "--d": "180ms" }}
                        >
                            {aside}
                        </div>
                    )}
                </div>
                <div className="section-body">{children}</div>
            </div>
        </section>
    );
}

export default Section;
