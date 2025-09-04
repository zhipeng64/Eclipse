import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchFriendModal({
  isFriendSearchOpen,
  friendModalRef,
}) {
  // List of potential errors on submission that show UI messages
  const [hasErrors, setHasErrors] = useState({
    customError: "",
  });

  const handleSearch = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { targetUsername } = Object.fromEntries(new FormData(event.target));
    if (!targetUsername) {
    }
  };

  return (
    <>
      <div
        className={`${isFriendSearchOpen ? "flex" : "hidden"} justify-center modal-overlay border-2 border-solid border-red-200`}
      >
        {/* overflow:auto creates scrollbar within container to contain elements */}
        <div
          id="search-friend-modal"
          className="flex flex-col self-center p-5 w-full max-w-xl h-full min-h-100 md:min-h-120 max-h-[80vh] overflow-auto shadow-card rounded-card primary-container"
          ref={friendModalRef}
        >
          <h1 className="text-center pb-5">Search for users</h1>
          <div className="flex pb-5">
            <div className="flex space-x-3 grow-1 pr-4">
              <i className="flex justify-center items-center standard-icon-container p-1">
                <FaSearch className="standard-icon" />
              </i>
              <div className="w-full">
                <label htmlFor="search-person-username"></label>
                <input
                  id="search-person-username"
                  type="text"
                  name="username"
                  className="neon-input p-1.5 rounded-lg w-full placeholder-gray-400"
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="grow-1 neon-button neon-button-animated rounded-lg"
            >
              Search
            </button>
          </div>
          {/* For h-full to work, parent must have an explictly defined height(px or percent) and min-height and max-height 
          are constraints, not definitions. */}
          <div
            id="search-person-results-container"
            className="flex flex-col bg-gray-900 grow-1 rounded-lg"
          >
            {/* Single entry for search results */}
            <div className="flex justify-between opac-shadow p-3">
              <div className="flex items-center">
                <img
                  src="../assets/sunrise2.jpg"
                  alt="Avatar"
                  className="w-11 h-11 rounded-full mr-2"
                />
                <p className="text-md">John Zena</p>
              </div>
              <button className="neon-button-purple neon-button-animated rounded-full p-3">
                Send friend request
              </button>
            </div>
            <div className="flex justify-between opac-shadow p-3">
              <div className="flex items-center">
                <img
                  src="../assets/sunrise.jpg"
                  alt="Avatar"
                  className="w-11 h-11 rounded-full mr-2"
                />
                <p className="text-md">Stewart</p>
              </div>
              <button className="neon-button-purple neon-button-animated rounded-full p-3">
                Send friend request
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={isOpen ? "modal-overlay" : "hidden"}></div> */}
    </>
  );
}
