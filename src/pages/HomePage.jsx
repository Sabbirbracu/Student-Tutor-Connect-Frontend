import { useState } from "react";
import LoginForm from "../components/forms/LoginForm.jsx";
import SignupForm from "../components/forms/SignupForm.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import FeaturesSection from "../components/sections/FeaturesSection.jsx";
import Hero from "../components/sections/Hero.jsx";
import Modal from "../components/ui/Modal.jsx";

import toast from "react-hot-toast";

// Components
const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginSuccess = (user) => {
    toast.success(`Welcome back, ${user.name}!`);
    // TODO: optionally redirect to dashboard based on user.role
  };

  const handleSignupSuccess = (user) => {
    toast.success(`Signup successful! Welcome, ${user.name}!`);
    setIsSignupOpen(false); // close modal
    // Keep user on Home page
  };

  return (
    <div>
      {/* Navbar with modal triggers */}
      <Navbar
        openLogin={() => setIsLoginOpen(true)}
        openSignup={() => setIsSignupOpen(true)}
      />

      <div className="pt-16">
        <Hero />
        <FeaturesSection />
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Sign In"
        size="max-w-md"
      >
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        title="Sign Up"
        size="max-w-md"
      >
        <SignupForm
          onClose={() => setIsSignupOpen(false)}
          onSuccess={handleSignupSuccess}
          onSwitchToLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
