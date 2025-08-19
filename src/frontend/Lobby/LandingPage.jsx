import { useState, useRef } from "react";
import NavigationBar from "../utils/NavigationBar";
import Footer from "../utils/Footer";
import RegisterModal from "../AccountRegistration/RegisterModal";
import LoginModal from "../AccountLogin/LoginModal";

// Utility functions
import { useCloseOnClickOutside } from "../utils/modules";

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const registrationModalRef = useRef(null);
  const loginModalRef = useRef(null);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  // Register event listeners
  useCloseOnClickOutside(registrationModalRef, isSignUp, () =>
    setIsSignUp(false)
  );
  useCloseOnClickOutside(loginModalRef, isLogin, () => setIsLogin(false));

  return (
    <div
      id="landing-page"
      className="min-h-screen flex flex-col w-auto bg-gradient-to-br from-[#0f1a2b]/100 to-[#1a2a44]/90 
"
    >
      <NavigationBar />
      <div id="body" className="text-gray-200 flex-1 flex items-start">
        <div id="main-display" className="ml-45 mr-20 max-w-2xl">
          <div className="flex flex-col space-y-5 w-full break-words p-20 shadow-card rounded-card hover-shadow primary-container">
            <h1 className="heading text-6xl mb-6">Join the Community</h1>
            <div className="text-gray-400 text-2xl font-medium space-y-2">
              <p>
                Welcome to Eclipse, a place to meet others and make longlasting
                relationships.
              </p>
              <p>
                Get access to emotes, real-time video chats, and an
                unforgettable memory.
              </p>
            </div>

            <div className="text-lg font-bold sm:space-x-7 sm:text-base mt-4">
              <button
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLogin();
                }}
                className="neon-button neon-button-animated rounded-lg py-3 px-6"
              >
                Log In
              </button>
              <button
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSignUp();
                }}
                className="neon-button neon-button-animated rounded-lg py-3 px-6"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div
          id="feature-section"
          className="flex flex-col px-15 pb-15 self-center max-w-2xl"
        >
          <h1 className="font-bold text-5xl mb-6 text-shadow-[0_0_12px_rgba(144,205,244,0.6)]">
            Features
          </h1>
          <ul className="text-gray-300 font-medium space-y-3 text-xl list-disc list-inside marker:text-[#90cdf4]">
            <li>Supports up to 1GB file uploads</li>
            <li>Real-time video chats</li>
            <li>AI Chat Assistant</li>
          </ul>
        </div>
      </div>
      <RegisterModal isSignUp={isSignUp} modalRef={registrationModalRef} />
      <LoginModal
        isLogin={isLogin}
        modalRef={loginModalRef}
        forgotPasswordCallback={() => {
          toggleLogin();
          toggleSignUp();
        }}
      />
      <Footer />
    </div>
  );
}
