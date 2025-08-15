// Icons
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginModal({
  isLogin,
  modalRef,
  forgotPasswordCallback,
}) {
  const handleForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target;
    console.log(target);
  };
  return (
    <>
      <div
        className={`${isLogin ? "flex" : "hidden"} fixed inset-0 bg-[#00000080] z-10 overflow-auto"`}
      >
        <div
          className="m-auto w-1/5 max-w-md pt-3 pr-1 pl-1 bg-[#0F0F1A] text-[#F5F5F5] border-white border-solid border-1 rounded-lg"
          ref={modalRef}
        >
          <form className="flex flex-col pb-5 space-y-4" onSubmit={handleForm}>
            <h1 className="text-center text-2xl mb-6">Login</h1>
            <div className="flex justify-center items-center gap-x-3">
              <FaUser />
              <input
                className="w-[65%] border-solid p-1 border-white border-1 rounded-md"
                placeholder="username"
              ></input>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-center items-center gap-x-3">
                <FaLock />
                <input
                  className="w-[65%] border-solid p-1 border-white border-1 rounded-md"
                  placeholder="password"
                  type="password"
                ></input>
              </div>
              <a className="text-xs ml-17 text-[#90cdf4] w-fit" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <input
                  className="bg-[#90cdf4] text-white w-[90%] font-semibold p-1.5 rounded-md cursor-pointer focusBtn"
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
