function Prompt({ as = "p", path = "~", className = "", id, children }) {
    const Tag = as;

    return (
        <Tag className={`prompt-line ${className}`.trim()} id={id}>
            <span className="prompt-user">ian@19x19</span>
            <span className="prompt-path">:{path}$</span> {children}
        </Tag>
    );
}

export default Prompt;
