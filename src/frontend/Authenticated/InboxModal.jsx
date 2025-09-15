import { useContext } from "react";
import SocketContext from "../Context/Socket";
function InboxModal({ inboxModalRef }) {
  console.log("Inbox opened");
  const { pendingFriendRequests } = useContext(SocketContext);

  const handleAcceptFriendRequest = async (username) => {
    // Post request
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/users/friend-requests/acceptance`;
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
    <div className="flex modal-overlay justify-center">
      <div
        id="inbox-modal"
        className="flex flex-col self-center p-5 w-full max-w-xl h-full min-h-100 md:min-h-120 max-h-[80vh] overflow-auto shadow-card rounded-card dlayer-4"
        ref={inboxModalRef}
      >
        <h1 className="text-center pb-5">Incoming Friend Requests</h1>
        {pendingFriendRequests.length > 0 &&
          pendingFriendRequests.map((request) => {
            return (
              <div
                key={request?.username}
                id="pending-friend-requests"
                className="dlayer-1 grow"
              >
                <div className="flex justify-between p-3 opac-shadow">
                  <div className="flex items-center">
                    <img
                      src={
                        request?.requestor?.profile?.avatarImage ||
                        "../assets/sunrise2.jpg"
                      }
                      alt="Avatar"
                      className="w-11 h-11 rounded-full mr-3.5"
                    />
                    <div className="flex flex-col">
                      <p className="text-md">
                        {request?.username || "Unknown User"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="min-w-20 neon-button-purple neon-button-animated rounded-full p-3"
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
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default InboxModal;
