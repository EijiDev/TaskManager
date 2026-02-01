import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layouts/NavBar.jsx";
import Hero from "./page/Hero.jsx";
import About from "./page/About.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Login from "./page/Login.jsx";
import Dashboard from "./page/Dashboard.jsx";

function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <NavBar />
      <Hero />
      <About />
      <Footer />
      <Login />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;