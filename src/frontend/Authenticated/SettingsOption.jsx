import { Navigation } from "./Navigation";

function SettingsOption() {
  return (
    <div
      id="settings-page"
      className="flex flex-col primary-background h-screen w-full px-30 border-solid"
    >
      <Navigation />
      <div id="title" className="opac-divider">
        <h1 className="text-3xl">Settings</h1>
      </div>
      <div id="settings-container" className="flex grow space-x-5 w-full py-5">
        <div
          id="settings-panel"
          className="flex flex-col bg-gray-700 w-full max-w-3xs py-2 text-xl self-start"
        >
          <button className="cursor-pointer">Profile</button>
        </div>
        <div id="edit-panel" className="flex flex-col bg-gray-600 w-full">
          <div className="flex flex-col grow space-y-3 w-full items-center justify-center">
            <div className="relative group">
              <img
                src="../assets/sunrise2.jpg"
                alt="Avatar"
                className="w-75 h-75 rounded-full mr-2 curso-pointer"
              />
              <div
                className="flex absolute inset-0 w-75 h-75 bg-gray-400/50 rounded-full text-center text-white z-10
               items-center justify-center cursor-pointer transition-opacity duration-200 ease-in-out 
               opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
              >
                Upload another image
              </div>
            </div>

            <div className="flex text-3xl space-x-35 pt-5">
              <p>Username: John Zena</p>
              <p>Email: JohnZena23@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsOption };
