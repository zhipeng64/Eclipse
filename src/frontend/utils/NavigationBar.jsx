export default function NavigationBar() {
  return (
    <nav className="bg-[#08090d] border-[#F5F5F5] border-b-1 text-[#F5F5F5] p-2">
      <div className="flex justify-between items-center">
        <div className="text-base font-bold sm:text-xl sm:ml-1.5">Eclipse</div>

        {/* <div className="text-xs space-x-3.5 sm:space-x-6 sm:text-base sm:p-2 sm:mr-20">
          <a
            href="#"
            onClick={(e) => {
              e.stopPropagation();
              toggleLogin();
            }}
            className="font-semibold hover:text-[#b5d4eb]"
          >
            Log In
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.stopPropagation();
              toggleSignUp();
            }}
            className="font-semibold hover:text-[#b5d4eb]"
          >
            Sign Up
          </a>
        </div> */}
      </div>
    </nav>
  );
}
