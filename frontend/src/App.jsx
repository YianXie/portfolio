import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Contributions from "./pages/Contributions";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/contributions"
                            element={<Contributions />}
                        />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
