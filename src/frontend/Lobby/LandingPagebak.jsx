import { useState, useRef } from "react";
import Footer from "../utils/Footer";
import RegisterModal from "../AccountRegistration/RegisterModal";
import LoginModal from "../AccountLogin/LoginModal";
import { useCloseOnClickOutside } from "../utils/modules";
import { FaUserAstronaut, FaRegStar, FaRegSmileBeam } from "react-icons/fa";

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const registrationModalRef = useRef(null);
  const loginModalRef = useRef(null);

  const toggleSignUp = () => setIsSignUp(!isSignUp);
  const toggleLogin = () => setIsLogin(!isLogin);

  useCloseOnClickOutside(registrationModalRef, isSignUp, () =>
    setIsSignUp(false)
  );
  useCloseOnClickOutside(loginModalRef, isLogin, () => setIsLogin(false));

  return (
    <div
      id="landing-page"
      className="min-h-screen flex flex-col w-auto bg-gradient-to-br from-[#0f1a2b] via-[#1a2a44] to-[#2196f3]"
    >
      <div id="body" className="text-[#F5F5F5] flex-1 flex flex-row">
        {/* Main content, left-aligned */}
        <main className="flex-1 flex flex-col justify-start pl-0 md:pl-16 pr-8 py-24">
          <div className="bg-[#101522]/80 rounded-xl shadow-[0_0_24px_#90cdf4cc] border border-[#90cdf4]/20 max-w-2xl w-full p-10 mb-12">
            <div className="flex items-center mb-6 space-x-4">
              <FaUserAstronaut className="text-[#90cdf4] text-5xl drop-shadow-[0_0_8px_#90cdf4]" />
              <span className="text-3xl font-bold text-[#90cdf4] tracking-wide uppercase">
                Eclipse
              </span>
            </div>
            <h1 className="font-bold text-5xl sm:text-6xl mb-4 tracking-wide uppercase text-white drop-shadow-[0_0_8px_#90cdf4]">
              Join the Community
            </h1>
            <div className="text-gray-300 text-xl font-semibold mb-6">
              <p>
                Welcome to Eclipse, a place to meet others and make longlasting
                relationships.
              </p>
              <p className="mt-2">
                Get access to emotes, real-time video chats, and an
                unforgettable memory.
              </p>
            </div>
            <div className="flex space-x-6 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLogin();
                }}
                className="font-bold bg-[#90cdf4] text-[#08090d] px-6 py-3 rounded-lg shadow-[0_0_10px_#90cdf4] hover:bg-[#38bdf8] hover:shadow-[0_0_20px_#90cdf4] transition"
              >
                Log In
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSignUp();
                }}
                className="font-bold border-2 border-[#90cdf4] text-[#90cdf4] px-6 py-3 rounded-lg hover:bg-[#90cdf4] hover:text-[#08090d] hover:shadow-[0_0_20px_#90cdf4] transition"
              >
                Sign Up
              </button>
            </div>
          </div>
          {/* Decorative horizontal accent */}
          <div className="w-full h-1 bg-gradient-to-r from-[#90cdf4] via-transparent to-transparent rounded-full opacity-40 mb-8" />
          {/* Feature/filler section for visual interest */}
          <section className="flex flex-row items-start space-x-8 mt-8">
            <div className="flex flex-col space-y-6">
              <div className="w-20 h-20 rounded-xl bg-[#1a365d]/60 shadow-[0_0_16px_#90cdf4] flex items-center justify-center text-3xl text-[#90cdf4] font-bold">
                <FaRegStar />
              </div>
              <div className="w-20 h-20 rounded-xl bg-[#1a365d]/60 shadow-[0_0_16px_#90cdf4] flex items-center justify-center text-3xl text-[#90cdf4] font-bold">
                <FaRegSmileBeam />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#90cdf4] mb-2">
                Why Eclipse?
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Cyber-inspired, modern design</li>
                <li>Real-time chat and video</li>
                <li>Custom emotes and avatars</li>
                <li>Safe, welcoming community</li>
              </ul>
              <div className="mt-8 text-gray-400 text-sm">
                <span>
                  <span className="text-[#90cdf4] font-bold">Tip:</span> Try out
                  our emotes and video chat for a unique experience!
                </span>
              </div>
            </div>
          </section>
          {/* Decorative bottom accent */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#90cdf4] to-transparent rounded-full opacity-30 mt-12" />
        </main>
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
