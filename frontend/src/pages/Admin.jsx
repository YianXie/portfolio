import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Admin.css";

function Admin() {
    const [token, setToken] = useState(
        localStorage.getItem("admin_token") || ""
    );
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [blogTitle, setBlogTitle] = useState("");
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || "";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("admin_token", data.token);
                setToken(data.token);
                setIsLoggedIn(true);
            } else {
                setLoginError(data.error || "Login failed.");
            }
        } catch {
            setLoginError("Network error. Please try again.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken("");
        setIsLoggedIn(false);
        setLoginData({ username: "", password: "" });
        setUploadSuccess(null);
        setUploadError("");
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.name.endsWith(".md")) {
            setFile(selected);
            setUploadError("");
        } else {
            setFile(null);
            setUploadError("Please select a .md file.");
        }
    };

    const handleUpload = useCallback(
        async (e) => {
            e.preventDefault();
            setUploadError("");
            setUploadSuccess(null);

            if (!blogTitle.trim()) {
                setUploadError("Please enter a blog title.");
                return;
            }

            if (!file) {
                setUploadError("Please select a markdown file.");
                return;
            }

            setUploadLoading(true);

            try {
                const content = await file.text();

                const response = await fetch(`${apiUrl}/api/blogs/create/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({ title: blogTitle, content }),
                });

                const data = await response.json();

                if (response.ok) {
                    setUploadSuccess({
                        title: data.title,
                        slug: data.slug,
                    });
                    setBlogTitle("");
                    setFile(null);
                    const fileInput = document.getElementById("md-file");
                    if (fileInput) fileInput.value = "";
                } else if (data.title) {
                    setUploadError(
                        Array.isArray(data.title) ? data.title[0] : data.title
                    );
                } else {
                    setUploadError(
                        data.error || "Upload failed. Please try again."
                    );
                }
            } catch {
                setUploadError("Network error. Please try again.");
            } finally {
                setUploadLoading(false);
            }
        },
        [blogTitle, file, token, apiUrl]
    );

    if (!isLoggedIn) {
        return (
            <div className="admin-page">
                <div className="admin-login">
                    <div className="admin-icon">
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <h1>Admin Login</h1>
                    <p>Sign in to manage blog posts</p>

                    {loginError && (
                        <div className="admin-error">{loginError}</div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="admin-field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={loginData.username}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        username: e.target.value,
                                    })
                                }
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="admin-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="admin-btn primary"
                            disabled={loginLoading}
                        >
                            {loginLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-dashboard">
                <div className="admin-header">
                    <h1>Blog Dashboard</h1>
                    <button onClick={handleLogout} className="admin-btn logout">
                        <i className="bx bx-log-out"></i>
                        Logout
                    </button>
                </div>

                <div className="admin-card">
                    <h2>
                        <i className="bx bx-upload"></i>
                        Upload New Blog Post
                    </h2>

                    {uploadError && (
                        <div className="admin-error">
                            <i className="bx bx-error-circle"></i>
                            {uploadError}
                        </div>
                    )}

                    {uploadSuccess && (
                        <div className="admin-success">
                            <i className="bx bx-check-circle"></i>
                            <span>
                                "{uploadSuccess.title}" published successfully!
                            </span>
                            <Link to={`/blog/${uploadSuccess.slug}`}>
                                View post
                                <i className="bx bx-link-external"></i>
                            </Link>
                        </div>
                    )}

                    <form onSubmit={handleUpload}>
                        <div className="admin-field">
                            <label htmlFor="blog-title">Blog Title</label>
                            <input
                                type="text"
                                id="blog-title"
                                value={blogTitle}
                                onChange={(e) => setBlogTitle(e.target.value)}
                                placeholder="Enter a unique title for your blog post"
                                required
                            />
                        </div>
                        <div className="admin-field">
                            <label htmlFor="md-file">Markdown File (.md)</label>
                            <div className="file-input-wrapper">
                                <input
                                    type="file"
                                    id="md-file"
                                    accept=".md"
                                    onChange={handleFileChange}
                                    required
                                />
                                <div className="file-input-display">
                                    <i className="bx bx-file"></i>
                                    <span>
                                        {file ? file.name : "Choose a .md file"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="admin-btn primary"
                            disabled={uploadLoading}
                        >
                            <i className="bx bx-cloud-upload"></i>
                            {uploadLoading ? "Uploading..." : "Publish Post"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;
