import { useState } from "react";
import LoginForm from "../components/forms/LoginForm.jsx";
import SignupForm from "../components/forms/SignupForm.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import FeaturesSection from "../components/sections/FeaturesSection.jsx";
import Hero from "../components/sections/Hero.jsx";
import Modal from "../components/ui/Modal.jsx";

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div>
      {/* Navbar with modal triggers */}
      <Navbar
        openLogin={() => setIsLoginOpen(true)}
        openSignup={() => setIsSignupOpen(true)}
      />

      <div className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <FeaturesSection />
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Sign In"
        size="max-w-md"
      >
        <LoginForm onSubmit={(data) => console.log("Login Data:", data)} />
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        title="Sign Up"
        size="max-w-md"
      >
        <SignupForm onSubmit={(data) => console.log("Signup Data:", data)} />
      </Modal>
    </div>
  );
};

export default HomePage;

