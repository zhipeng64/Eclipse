import { useState, useRef, useEffect } from "react";
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
    <div id="landing-page" className="min-h-screen flex flex-col">
      <NavigationBar toggleSignUp={toggleSignUp} toggleLogin={toggleLogin} />
      <div
        id="body"
        className="text-[#F5F5F5] bg-[#0F0F1A] bg-opacity-70 flex-1 flex"
      >
        <div id="main-display" className="flex-1 flex">
          <div className="mt-20 ml-55 flex flex-col space-y-5 w-1/3">
            <h1 className="font-bold text-6xl">Feeling Lonely?</h1>
            <p className="font-semibold">
              Welcome to Eclipse, a place to meet others and make longlasting
              relationships
            </p>
            <p className="font-semibold">
              <span className="text-[#b5d4eb]">
                Register now to get 100 vbucks or $10 Amazon Giftcard
              </span>
            </p>
          </div>

          <div className="w-1/2 p-4">
            <img
              src="../assets/sunrise.jpg"
              className="w-full h-auto max-h-120 mt-10"
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
