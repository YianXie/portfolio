import axios from "axios";
import { useState } from "react";

import Prompt from "../components/Prompt";
import Tsumego from "../components/Tsumego";
import "../styles/Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/contact/`,
                formData
            );
            setSuccessMessage(
                response.data.message ||
                    `Thank you, ${formData.name}. Your message has been sent!`
            );
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error ||
                    "Failed to send message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <header className="wrap contact-header">
                <h1 className="display" data-reveal="lines">
                    <span className="line">
                        <span>White to play.</span>
                    </span>
                    <span className="line">
                        <span style={{ "--d": "120ms" }}>Your move.</span>
                    </span>
                </h1>
            </header>

            <div className="wrap contact-body">
                <section
                    className="mail"
                    aria-labelledby="mail-heading"
                    data-reveal="rise"
                    style={{ "--d": "260ms" }}
                >
                    <Prompt as="h2" id="mail-heading" className="mail-heading">
                        mail -s &quot;your move&quot; ian
                    </Prompt>

                    {successMessage && (
                        <p className="mail-status" role="status">
                            = {successMessage}
                        </p>
                    )}
                    {errorMessage && (
                        <p
                            className="mail-status mail-status--error"
                            role="alert"
                        >
                            ? {errorMessage}
                        </p>
                    )}

                    <form className="mail-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">from:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message">body:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn btn--primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "sending…" : "send ↵"}
                            </button>
                        </div>
                    </form>

                    <dl className="mail-links">
                        <div>
                            <dt>email</dt>
                            <dd>
                                <a href="mailto:yianxie52@gmail.com">
                                    yianxie52@gmail.com
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt>github</dt>
                            <dd>
                                <a
                                    href="https://github.com/YianXie"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    YianXie
                                </a>
                            </dd>
                        </div>
                    </dl>
                </section>

                <Tsumego />
            </div>
        </>
    );
}

export default Contact;
