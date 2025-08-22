import Navbar from "./components/layout/Navbar";
import FeaturesSection from "./components/sections/FeaturesSection.jsx";
import Hero from "./components/sections/Hero.jsx";
function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {/* Other sections like Hero will go here */}
        <Hero />
        <FeaturesSection/>
      </div>
    </>
  );
}

export default App;
