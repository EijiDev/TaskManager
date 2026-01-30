import NavBar from "./components/layouts/NavBar.jsx";
import Hero from "./page/Hero.jsx";
import About from "./page/About.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Login from "./page/Login.jsx";

function App() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* The NavBar sits on top of the Hero */}
      <NavBar />
      
      {/* Main Sections */}
      <Hero />
      <About />
      <Footer />

      {/* The Login Modal (Hidden by default, triggered by NavBar) */}
      <Login />
    </div>
  );
}

export default App;