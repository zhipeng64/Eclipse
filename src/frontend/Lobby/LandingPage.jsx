import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../utils/NavigationBar";
import Footer from "../utils/Footer";
import RegisterModal from "../AccountRegistration/RegisterModal";
import LoginModal from "../AccountLogin/LoginModal";

// Utility functions
import { useCloseOnClickOutside } from "../utils/customHooks";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const registrationModalRef = useRef(null);
  const loginModalRef = useRef(null);

  // Register event listeners
  useCloseOnClickOutside(registrationModalRef, isSignUp, () =>
    setIsSignUp(false)
  );
  useCloseOnClickOutside(loginModalRef, isLogin, () => setIsLogin(false));

  // Callbacks
  const handleRegistrationSuccess = () => {
    navigate("/main-lobby");
  };
  return (
    <div
      id="landing-page"
      className="min-h-screen flex flex-col w-auto layer-0"
    >
      <NavigationBar />
      <div
        id="body"
        className="text-gray-200 flex-1 flex flex-col gap-y-30 sm:px-20 md:px-40 md:gap-20"
      >
        {/* Main Content */}
        <section className="flex flex-col max-w-4xl text-center self-center gap-y-5 lg:max-w-5xl">
          <div className="flex flex-col gap-y-3 lg:gap-y-5">
            <h1 className="text-[oklch(0.75_0.04_246.6)] text-5xl md:text-6xl text-center lg:text-7xl">
              Join the Community
            </h1>
            <p className="text-center text-lg lg:text-2xl">
              Connect with people in real time and make lasting relationships.
            </p>
          </div>

          <div
            id="main-display"
            className="primary-container-border rounded-lg p-6 lg:py-25 lg:px-20"
          >
            <div className="flex flex-col gap-y-4 lg:gap-y-6">
              <div className="text-gray-300 text-md md:text-lg lg:text-2xl font-medium space-y-2 lg:space-y-4">
                <p>
                  Welcome to Eclipse, platform where you can chat and meet new
                  people.
                </p>
                <p>
                  Get access to emotes, real-time video chats, and an AI
                  assistant.
                </p>
                <p className="text-gray-400 lg:text-xl">
                  Join now and start your journey towards building meaningful
                  connections!
                </p>
              </div>

              <div className="text-center font-bold text-md space-x-3 sm:space-x-7 mt-4 lg:text-lg">
                <button
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLogin(true);
                  }}
                  className="rounded-lg py-2 px-6 md:py-3 md:px-9 lg:py-4 lg:px-12 neon-button-purple neon-button-purple-animated"
                >
                  Log In
                </button>
                <button
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSignUp(true);
                  }}
                  className="rounded-lg py-2 px-6 md:py-3 md:px-9- lg:py-4 lg:px-12 neon-button-purple neon-button-purple-animated"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </section>
        <div id="features-container" className="flex flex-col gap-y-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[oklch(0.75_0.04_246.6)]">
            Features
          </h2>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 p-4 primary-container-border lg:p-4">
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                Real-time Chat
              </p>
              <p className="text-gray-400">
                Engage in seamless conversations with friends and new
                acquaintances.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-800/50 p-4 primary-container-border lg:p-4">
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                Video Calls
              </p>
              <p className="text-gray-400 ">
                Connect face-to-face with friends and family through
                high-quality video calls.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-800/50 p-4 primary-container-border lg:p-4">
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                AI Assistant
              </p>
              <p className="text-gray-400">
                Get help from our AI assistant for a more personalized
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      {isSignUp && (
        <RegisterModal
          handleRegistrationSuccess={handleRegistrationSuccess}
          modalRef={registrationModalRef}
        />
      )}

      {isLogin && (
        <LoginModal
          modalRef={loginModalRef}
          forgotPasswordCallback={() => {
            setIsSignUp(!isSignUp);
            setIsLogin(!isLogin);
          }}
        />
      )}
      <Footer />
    </div>
  );
}
