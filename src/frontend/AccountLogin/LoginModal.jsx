import { useNavigate } from "react-router-dom";

// Icons
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginModal({ modalRef, forgotPasswordCallback }) {
  const navigate = useNavigate();
  const handleForm = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { username, password } = Object.fromEntries(
      new FormData(event.target).entries()
    );
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/login`;
    const postData = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Needed to set or send cookie
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login for user failed");
      } else {
        navigate("/main-lobby");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={"flex modal-overlay"}>
        <div
          className="m-auto w-full max-w-xs pt-3 px-1 text-[#F5F5F5] shadow-card rounded-card dlayer-1"
          ref={modalRef}
        >
          <form className="flex flex-col pb-5 space-y-4" onSubmit={handleForm}>
            <h1 className="text-center text-2xl mb-6">Login</h1>
            <div className="flex justify-center items-center gap-x-3">
              <FaUser />
              <input
                className="w-[65%] p-1 rounded-lg neon-input"
                name="username"
                placeholder="username"
                type="text"
                autoComplete="on"
              ></input>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-center items-center gap-x-3">
                <FaLock />
                <input
                  className="w-[65%] border-solid p-1 rounded-lg neon-input"
                  placeholder="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                ></input>
              </div>
              <a className="text-xs ml-17 text-[#90cdf4] w-fit" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <input
                  className="w-[90%] font-semibold p-1.5 rounded-lg neon-button-purple neon-button-purple-animated"
                  type="submit"
                  value="Login"
                ></input>
              </div>
              <div className="flex justify-center">
                <p className="text-xs p-1.5 w-[90%]">
                  Don't have an account?{" "}
                  <button
                    className="text-[#90cdf4] w-fit cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      forgotPasswordCallback();
                    }}
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
