import { useContext } from "react";
import SocketContext from "../Context/Socket";
import env from "../config.js";
function InboxModal({ inboxModalRef }) {
  console.log("Inbox opened");
  const { pendingFriendRequests } = useContext(SocketContext);
  console.log(pendingFriendRequests);
  console.log(pendingFriendRequests.length);

  const handleAcceptFriendRequest = async (username) => {
    // Post request
    const apiUrl = `${env.VITE_BACKEND_URL}/api/users/friend-requests/acceptance`;
    const postData = {
      username: username,
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Accepting friend request failed");
      } else {
        console.log("Friend request accepted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col modal-overlay justify-center">
      <div
        id="inbox-modal"
        className="flex flex-col grow self-center p-5 w-full max-w-md sm:max-w-xl max-h-[80vh] shadow-card rounded-card bg-[oklch(0.12_0_0)]"
        ref={inboxModalRef}
      >
        <h1 className="text-center lg:text-xl pb-5 text-[oklch(0.75_0.04_246.6)]">
          Incoming Friend Requests
        </h1>
        <div
          id="pending-friend-requests-container"
          className={`grow bg-[oklch(0.17_0.0_0)] rounded-lg overflow-auto opac-shadow ${
            pendingFriendRequests.incoming &&
            pendingFriendRequests.incoming.length === 0
              ? "flex items-center justify-center"
              : ""
          }`}
        >
          {pendingFriendRequests.incoming &&
          pendingFriendRequests.incoming.length === 0 ? (
            <p className="text-sm sm:text-md lg:text-lg">
              No incoming friend requests
            </p>
          ) : (
            pendingFriendRequests.incoming.map((request) => {
              return (
                <div
                  className="flex justify-between p-3 opac-shadow"
                  key={request?.username}
                >
                  <div className="flex items-center">
                    <img
                      src={`data:image/${request?.avatarImageType};base64,${request?.avatar || "../assets/sunrise2.jpg"}`}
                      alt="Avatar"
                      className="w-11 h-11 rounded-full mr-3.5 drop-shadow-[oklch(0.8_0.05_246.6)]/40 drop-shadow-sm"
                    />
                    <div className="flex flex-col">
                      <p className="text-md">
                        {request?.username || "Unknown User"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="min-w-20 text-sm sm:text-md lg:text-lg neon-button-purple neon-button-animated rounded-full p-3"
                      onClick={() =>
                        handleAcceptFriendRequest(request?.username)
                      }
                    >
                      Accept
                    </button>
                    {/* <button className="min-w-20 neon-button-purple neon-button-animated rounded-full p-3">
                    Reject
                </button> */}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxModal;
