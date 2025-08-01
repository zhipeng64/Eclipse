import { useState, useRef, useEffect } from "react";
import { checkValidPassword } from "../utils/utils";
import { FaEye } from "react-icons/fa";

export default function RegisterModal({ isSignUp, modalRef }) {
  // Detects onchanging form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Detects onchanging password status and displays updated UI
  const [passwordStatus, setPasswordStatus] = useState({
    hasMinLength: false,
    hasUpper: false,
    hasLower: false,
    hasSymbol: false,
  });

  // Toggle to reveal or hide password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // List of potential errors on submission
  const [hasErrors, setHasErrors] = useState({
    isPasswordMismatch: false,
    isPasswordPolicyViolated: false,
  });

  const updatePasswordStatus = (password) => {
    // Check password requirements
    const status = checkValidPassword(password);
    const currentPasswordStatus = {
      hasMinLength: true,
      hasUpper: true,
      hasLower: true,
      hasSymbol: true,
    };

    // Invalid password
    console.log(status);
    if (status && status.length) {
      for (const entry of status) {
        switch (entry.message) {
          case "uppercase":
            currentPasswordStatus.hasUpper = false;
            break;
          case "lowercase":
            currentPasswordStatus.hasLower = false;
            break;
          case "symbol":
            currentPasswordStatus.hasSymbol = false;
            break;
          case "minLength":
            currentPasswordStatus.hasMinLength = false;
            break;
        }
      }
    }
    setPasswordStatus(currentPasswordStatus);
  };

  const handleChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name == "password") updatePasswordStatus(value);
  };

  const toggleIsPasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const formData = new FormData(event.target);
    const { username, password, confirmPassword, email } = Object.fromEntries(
      new FormData(event.target)
    );

    // Password checks
    // Password policy enforcement
    let passwordPolicyViolated = false;
    Object.keys(passwordStatus).forEach((key) => {
      const value = passwordStatus[key];
      if (!value) {
        passwordPolicyViolated = true;
      }
    });
    setHasErrors((prev) => ({
      ...prev,
      isPasswordPolicyViolated: passwordPolicyViolated,
    }));

    // Password match enforcement
    let passwordMismatch = false;
    if (password !== confirmPassword) {
      passwordMismatch = true;
    }
    setHasErrors((prev) => ({
      ...prev,
      isPasswordMismatch: passwordMismatch,
    }));

    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    const postData = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    // Fetch can throw error, so must wrap in try/catch block
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("Error encountered on registering account.");
    }
  };

  return (
    <>
      <div
        className={`${isSignUp ? "flex" : "hidden"} fixed inset-0 z-10 overflow-auto bg-[#00000080]`}
      >
        <div
          id="modal"
          className="flex m-auto w-1/3 p-5 max-w-md bg-[#0F0F1A] border-1 border-solid border-[#f5f5f5]"
          ref={modalRef}
        >
          <form
            id="registration"
            className="text-[#F5F5F5] w-full flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl text-center">Register account</h1>
            <div>
              <div>
                <h3>Password must contain a minimum of:</h3>
                <ul className="text-[#b5d4eb] text-sm">
                  <li>
                    {passwordStatus.hasMinLength ? "✅" : "❌"} 12 characters
                  </li>
                  <li>
                    {passwordStatus.hasUpper ? "✅" : "❌"} 1 uppercase letter
                  </li>
                  <li>
                    {passwordStatus.hasLower ? "✅" : "❌"} 1 lowercase letter
                  </li>
                  <li>{passwordStatus.hasSymbol ? "✅" : "❌"} 1 symbol</li>
                </ul>
              </div>
              {hasErrors.isPasswordPolicyViolated && (
                <div className="text-[#D32F2F]">
                  <p>Password requirements are not met</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="username"
                name="username"
                className="p-1.5 block w-full rounded-md border-1 border-solid border-[#f5f5f5]"
              ></input>
            </div>

            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                name="email"
                className="p-1.5 block w-full rounded-md border-1 border-solid border-[#f5f5f5]"
              ></input>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                name="password"
                className="p-1.5 block w-full rounded-md border-1 border-solid border-[#f5f5f5]"
                onChange={handleChange}
              ></input>

              <div className="absolute flex flex-col space-y-1 bottom-2.5 right-3 cursor-pointer">
                {/* Tooltip Wrapper */}
                <div className="group relative">
                  {/* Tooltip */}
                  <div
                    className="invisible absolute bottom-[180%] -right-[3.45rem] mb-2 w-32 bg-gray-800
                   text-[#F5F5F5] text-sm text-center py-1 px-2 rounded select-none cursor-default
                    before:content-[''] before:absolute before:top-full before:right-13 
                    before:w-0 before:h-0
                    before:border-x-[0.8em] before:border-x-transparent
                    before:border-t-[1.7em]  before:border-gray-800
                    group-hover:visible
                  "
                  >
                    Show password
                  </div>

                  {/* Icon */}
                  <FaEye onClick={toggleIsPasswordVisible} />
                </div>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="confirm-password" className="block">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  className="p-1.5 block w-full rounded-md border-1 border-solid border-[#f5f5f5]"
                ></input>
              </div>

              {hasErrors.isPasswordMismatch && (
                <div className="text-[#D32F2F]">
                  <p>Passwords do not match</p>
                </div>
              )}
            </div>

            <div>
              <input
                type="submit"
                name="submit"
                className="bg-[#b5d4eb] text-[#121212] font-semibold mt-3.5 p-2 block w-1/5 rounded-md cursor-pointer"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
