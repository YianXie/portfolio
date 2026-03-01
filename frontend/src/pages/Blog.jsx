import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import "../styles/Blog.css";

function Blog() {
    const { slug } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL || ""}/api/blogs/`
                );
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (!slug) {
            setCurrentPost(null);
            return;
        }

        const fetchPost = async () => {
            setPostLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL || ""}/api/blogs/${slug}/`
                );
                if (response.ok) {
                    const data = await response.json();
                    setCurrentPost(data);
                } else {
                    setCurrentPost(null);
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
                setCurrentPost(null);
            } finally {
                setPostLoading(false);
                setSidebarOpen(false);
            }
        };
        fetchPost();
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return <div className="loading">Loading blogs...</div>;
    }

    return (
        <div className="blog-layout">
            <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <i className={`bx ${sidebarOpen ? "bx-x" : "bx-menu"}`}></i>
            </button>

            <aside className={`blog-sidebar ${sidebarOpen ? "open" : ""}`}>
                <h2>Blog Posts</h2>
                {blogs.length === 0 ? (
                    <p className="no-posts">No posts yet.</p>
                ) : (
                    <ul>
                        {blogs.map((blog) => (
                            <li key={blog.id}>
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className={
                                        slug === blog.slug ? "active" : ""
                                    }
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sidebar-title">
                                        {blog.title}
                                    </span>
                                    <span className="sidebar-date">
                                        {formatDate(blog.created_at)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </aside>

            <div
                className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            <article className="blog-content">
                {!slug ? (
                    <div className="blog-welcome">
                        <i className="bx bxs-book-content"></i>
                        <h1>Welcome to my Blog</h1>
                        <p>
                            Select a post from the sidebar to start reading, or
                            browse through my thoughts on programming, tech, and
                            more.
                        </p>
                        {blogs.length > 0 && (
                            <Link
                                to={`/blog/${blogs[0].slug}`}
                                className="read-latest"
                            >
                                Read latest post
                                <i className="bx bx-right-arrow-alt"></i>
                            </Link>
                        )}
                    </div>
                ) : postLoading ? (
                    <div className="blog-loading">
                        <div className="spinner"></div>
                        <p>Loading post...</p>
                    </div>
                ) : currentPost ? (
                    <div className="blog-post">
                        <header className="post-header">
                            <h1>{currentPost.title}</h1>
                            <time>{formatDate(currentPost.created_at)}</time>
                        </header>
                        <div className="markdown-body">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {currentPost.content}
                            </Markdown>
                        </div>
                    </div>
                ) : (
                    <div className="blog-not-found">
                        <i className="bx bx-error-circle"></i>
                        <h2>Post not found</h2>
                        <p>The blog post you're looking for doesn't exist.</p>
                        <Link to="/blog">Back to blog</Link>
                    </div>
                )}
            </article>
        </div>
    );
}

export default Blog;
