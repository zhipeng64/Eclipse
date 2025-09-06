import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchFriendModal({
  isFriendSearchOpen,
  friendModalRef,
}) {
  // List of potential errors on user search
  const [searchErrors, setSearchErrors] = useState({
    searchError: "",
  });

  // Sent friend requests
  const [friendRequestSent, setFriendRequestSent] = useState({});

  // List of potential errors on sending friend requests
  const [friendRequestErrors, setFriendRequestErrors] = useState({
    friendRequestError: "",
  });

  // List of users from search results (if any)
  const [usersSearched, setUsersSearched] = useState([]);

  const handleSearch = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { username } = Object.fromEntries(new FormData(event.target));
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/lookup`;
      // Query parameters represented with URLSearchParams
      const queryParams = new URLSearchParams({
        targetUsername: username,
      });
      const apiUrl = `${url}?${queryParams.toString()}`;

      // GET Request
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        const errors = data.errors || [];
        const newErrors = { searchError: "" };

        for (const { field, msg } of errors) {
          if (field === "searchError") {
            newErrors.searchError = msg;
          } else {
            throw new Error("An unknown error has occurred during user lookup");
          }
        }
        setSearchErrors(newErrors);
      } else {
        const users = data.searchResults;
        console.log("search results");
        console.log(data);
        console.log(users);
        setUsersSearched(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequest = async (username) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/friend-requests`;
      const postData = {
        username,
      };
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        const errors = data.errors || [];
        const newErrors = { friendRequestErrors: "" };
        for (const { field, msg } of errors) {
          if (field === "friendRequestError") {
            newErrors.friendRequestErrors = msg;
          } else {
            throw new Error(
              "An unknown error has occurred when sending friend request to user"
            );
          }
        }
        setFriendRequestErrors(newErrors);
      } else {
        const friendRequestStatus = data.friendRequestStatus;
        if (friendRequestStatus) {
          setFriendRequestSent((prev) => ({
            ...prev,
            username: true,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${isFriendSearchOpen ? "flex" : "hidden"} justify-center modal-overlay`}
      >
        {/* overflow:auto creates scrollbar within container to contain elements */}
        <div
          id="search-friend-modal"
          className="flex flex-col self-center p-5 w-full max-w-xl h-full min-h-100 md:min-h-120 max-h-[80vh] overflow-auto shadow-card rounded-card primary-container"
          ref={friendModalRef}
        >
          <h1 className="text-center pb-5">Search for users</h1>
          <form className="flex pb-5" onSubmit={handleSearch}>
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
          </form>
          {/* User Lookup Error */}
          {searchErrors.searchError && <p>{searchErrors.searchError}</p>}

          {/* For h-full to work, parent must have an explictly defined height(px or percent) and min-height and max-height 
          are constraints, not definitions. */}
          <div
            id="search-person-results-container"
            className={`flex flex-col bg-gray-900 grow rounded-lg ${
              usersSearched.length === 0 ? "items-center justify-center" : ""
            }`}
          >
            {usersSearched.length === 0 ? (
              <p>No users found with current username</p>
            ) : (
              usersSearched.map((user) => {
                const sentFriendRequest = friendRequestSent[user.username];
                return (
                  <div
                    key={user.username}
                    className="flex justify-between opac-shadow p-3"
                  >
                    <div className="flex items-center">
                      <img
                        src="../assets/sunrise2.jpg"
                        alt="Avatar"
                        className="w-11 h-11 rounded-full mr-2"
                      />
                      <p className="text-md">{user.username}</p>
                    </div>
                    <button
                      className="neon-button-purple neon-button-animated rounded-full p-3"
                      onClick={() => handleFriendRequest(user.username)}
                      disabled={sentFriendRequest}
                    >
                      {sentFriendRequest
                        ? "Friend request sent"
                        : "Send friend request"}
                    </button>
                  </div>
                );
              })
            )}
            {/* Single entry for search results */}
          </div>
        </div>
      </div>
      {/* <div className={isOpen ? "modal-overlay" : "hidden"}></div> */}
    </>
  );
}
