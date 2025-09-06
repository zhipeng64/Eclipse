import { useState } from "react";
import { checkValidPassword } from "../utils/utils";
import { FaEye } from "react-icons/fa";

export default function RegisterModal({
  isSignUp,
  handleRegistrationSuccess,
  modalRef,
}) {
  // Detects onchanging password status and displays updated UI
  const [passwordStatus, setPasswordStatus] = useState({
    hasMinLength: false,
    hasUpper: false,
    hasLower: false,
    hasSymbol: false,
  });

  // Toggle to reveal or hide password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // List of potential errors on submission that show UI messages
  const [hasErrors, setHasErrors] = useState({
    passwordPolicyViolated: "",
    passwordMismatch: "",
    invalidEmail: "",
    customError: "",
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
    if (name == "password") updatePasswordStatus(value);
  };

  const toggleIsPasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const formData = new FormData(event.target);
    const { username, password, confirmPassword, email } =
      Object.fromEntries(formData);

    const url = `${import.meta.env.VITE_BACKEND_URL}/registration`;
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
        credentials: "include", // Needed to set or send cookie
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("printing data...");
      console.log(data);
      if (!response.ok) {
        if (data.errors) {
          const fields = [
            "invalidEmail",
            "passwordPolicyViolated",
            "passwordMismatch",
            "customError",
          ];
          const newErrors = fields.reduce((acc, field) => {
            acc[field] = "";
            return acc;
          }, {});

          // Process each error message
          for (const { field, msg } of data.errors) {
            switch (field) {
              case "email":
                newErrors.invalidEmail = msg;
                break;
              case "password":
                newErrors.passwordPolicyViolated = msg;
                break;
              case "confirmPassword":
                newErrors.passwordMismatch = msg;
                break;
              case "customError":
                newErrors.customError = msg;
                break;
              default:
                throw new Error(`An unknown error has occurred }`);
            }
          }
          setHasErrors(newErrors);
        }
      } else {
        // Navigate to main lobby
        handleRegistrationSuccess();
      }
    } catch (error) {
      console.log(error);
      console.log("Error encountered on registering account.");
    }
  };

  return (
    <>
      <div className={`${isSignUp ? "flex" : "hidden"} modal-overlay`}>
        <div
          id="modal"
          className="flex m-auto p-5 w-full max-w-md shadow-card rounded-card primary-container"
          ref={modalRef}
        >
          <form
            id="registration"
            className="text-gray-200 w-full flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-6 text-center">
              Register account
            </h1>
            <div>
              <div>
                <p>Password must contain a minimum of:</p>
                <ul className="text-gray-300 text-sm">
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
              {hasErrors.customError && (
                <div className="text-[#D32F2F]">
                  <p>{hasErrors.customError}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="username" className="block">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  name="username"
                  className="neon-input p-1.5 rounded-lg w-full placeholder-gray-400"
                ></input>
              </div>

              <div>
                <div>
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email"
                    name="email"
                    className="neon-input p-1.5 rounded-lg w-full placeholder-gray-400"
                  ></input>
                </div>
                {hasErrors.invalidEmail && (
                  <div className="text-[#D32F2F]">
                    <p>{hasErrors.invalidEmail}</p>
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <label htmlFor="password" className="block">
                    Password
                  </label>
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="neon-input p-1.5 rounded-lg w-full placeholder-gray-400"
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
                      <i>
                        <FaEye onClick={toggleIsPasswordVisible} />
                      </i>
                    </div>
                  </div>
                </div>
                {hasErrors.passwordPolicyViolated && (
                  <div className="text-[#D32F2F]">
                    <p>{hasErrors.passwordPolicyViolated}</p>
                  </div>
                )}
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
                    className="neon-input p-1.5 rounded-lg w-full placeholder-gray-400"
                  ></input>
                </div>

                {hasErrors.passwordMismatch && (
                  <div className="text-[#D32F2F]">
                    <p>{hasErrors.passwordMismatch}</p>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="submit"
                  name="submit"
                  className="neon-button neon-button-animated rounded-lg py-2 px-4 mt-4"
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
