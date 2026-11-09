import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RevealObserver from "./components/RevealObserver";
import ScrollManager from "./components/ScrollManager";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

function Page() {
    const { pathname } = useLocation();

    return (
        <main key={pathname} className="page-enter">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}

function App() {
    return (
        <Router>
            <ScrollManager />
            <RevealObserver />
            <div className="app">
                <Header />
                <Page />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
