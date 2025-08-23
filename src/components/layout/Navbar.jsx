import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../ui/Button";

const Navbar = ({ openLogin, openSignup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="bg-primary text-white font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">
              ST
            </div>
            <span className="ml-3 text-lg font-semibold text-neutral">
              Student Tutor Connect
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="text-gray-700 hover:text-primary">Features</a>
            <a href="#about" className="text-gray-700 hover:text-primary">About</a>
            <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>

            <button onClick={openLogin}>
              <Button variant="outline" className="mr-2">Sign In</Button>
            </button>

            <button onClick={openSignup}>
              <Button variant="primary">Get Started</Button>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-primary" onClick={closeMenu}>Features</a>
            <a href="#about" className="block text-gray-700 hover:text-primary" onClick={closeMenu}>About</a>
            <a href="#contact" className="block text-gray-700 hover:text-primary" onClick={closeMenu}>Contact</a>

            <button onClick={() => { openLogin(); closeMenu(); }} className="w-full">
              <Button variant="outline" className="w-full">Sign In</Button>
            </button>

            <button onClick={() => { openSignup(); closeMenu(); }} className="w-full">
              <Button variant="primary" className="w-full">Get Started</Button>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
