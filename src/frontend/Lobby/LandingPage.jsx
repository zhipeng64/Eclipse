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
    <div id="landing-page" className="min-h-screen flex flex-col w-auto">
      <NavigationBar />
      <div
        id="body"
        className="text-[#F5F5F5] bg-[#08090d] bg-opacity-70 flex-1 flex"
      >
        <div id="main-display" className="flex w-full items-start">
          <div className="mt-20 ml-55 flex flex-col space-y-5 w-[40%] break-words">
            <h1 className="font-bold text-7xl">Feeling Lonely?</h1>
            <div className="text-gray-50 text-2xl font-semibold">
              <p>
                Welcome to Eclipse, a place to meet others and make longlasting
                relationships.
              </p>
              <br />
              <p>
                Get access to emotes, real-time video chats, and an
                unforgettable memory.
              </p>
            </div>

            <div className="text-xs sm:space-x-7 sm:text-base">
              <button
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLogin();
                }}
                className="font-semibold bg-[#90cdf4] text-white cursor-pointer px-3 py-2 rounded-lg focusBtn"
              >
                Log In
              </button>
              <button
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSignUp();
                }}
                className="font-semibold bg-[#90cdf4] text-white cursor-pointer px-3 py-2 rounded-lg focusBtn"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="ml-8 mr-8 mt-20">
            <img
              src="../assets/sunrise2.jpg"
              className="w-200 rounded-lg brightness-100 contrast-90 saturate-80 mix-blend-color-overlay border-none ring-1 ring-white/10 shadow-lg"
            ></img>
          </div>
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
