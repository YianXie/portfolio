import axios from "axios";
import { useState } from "react";

import "./Contact.css";

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
            <section className="contact">
                <div className="title">
                    <h1>Contact me</h1>
                    <p>Get in touch</p>
                </div>

                <div className="info">
                    <img
                        src="/images/social-media.png"
                        alt="social-media.png"
                        draggable="false"
                    />
                    <div className="items">
                        <div className="item">
                            <i className="bx bxs-user-badge"></i>
                            <div>
                                <b>Name</b>
                                <p>Yian (Ian) Xie</p>
                            </div>
                        </div>
                        <div className="item">
                            <i className="bx bxl-github"></i>
                            <div>
                                <b>GitHub</b>
                                <p>
                                    <a href="https://github.com/YianXie">
                                        YianXie
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="item">
                            <i className="bx bxs-envelope"></i>
                            <div>
                                <b>Email</b>
                                <p>
                                    <a href="mailto:yianxie52@gmail.com">
                                        yianxie52@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="form">
                <h1>Send me a message online!</h1>

                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="What's on your mind?"
                            required
                        ></textarea>
                    </div>

                    <input
                        type="submit"
                        value={isSubmitting ? "Sending..." : "Send"}
                        disabled={isSubmitting}
                    />
                </form>
            </section>
        </>
    );
}

export default Contact;
