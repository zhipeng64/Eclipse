import { useState, useContext, useEffect, useRef } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import SocketContext from "../Context/Socket.jsx";

function ChatPanel() {
  // Get the socket and selectedFriend from context
  const {
    socket,
    currentUser,
    selectedFriend,
    conversationHistory,
    setConversationHistory,
  } = useContext(SocketContext);
  const [inputSettings, setInputSettings] = useState({
    inputRowCount: 1,
    focus: false,
  });
  const chatMessagesRef = useRef(null);

  // Clears previous conversation history and fetches new history when selectedFriend changes
  useEffect(() => {
    if (selectedFriend && socket) {
      setConversationHistory([]);
      socket.emit("conversation", { chatroomId: selectedFriend.chatroomId });
    }
  }, [selectedFriend, socket]);

  // Auto-scroll to bottom when new messages arrive (only if user is at bottom, within 100px)
  useEffect(() => {
    if (chatMessagesRef.current && conversationHistory.length > 0) {
      const container = chatMessagesRef.current;
      const isNearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 100;

      if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [conversationHistory]);

  console.log("Conversation History in ChatPanel:", conversationHistory);
  if (selectedFriend === null) {
    // Render everything below but with placeholder
    return (
      <div
        id="chat-panel"
        className="justify-center items-center text-gray-400 bg-gray-800/65 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow"
      >
        Select a friend to chat with on the left panel
      </div>
    );
  }
  return (
    <div
      id="chat-panel"
      className="text-white bg-gray-800/65 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow"
    >
      <div
        id="recipient"
        className="flex items-center justify-between pl-2 sm:px-5 py-2 opac-shadow"
      >
        <div className="flex items-center">
          <img
            src={`data:image/${selectedFriend?.avatarImageType || "jpeg"};base64,${selectedFriend?.avatar || "../assets/sunrise2.jpg"}`}
            alt="Avatar"
            className="w-11 h-11 rounded-full mr-2"
          />
          <p className="text-md">
            {selectedFriend ? selectedFriend.username : "Unknown"}
          </p>
        </div>
        <div className="flex space-x-7 text-gray-200 pr-2">
          <i className="standard-icon-container p-1">
            <IoVideocam className="standard-icon" />
          </i>
          <i className="standard-icon-container p-1">
            <IoMic className="standard-icon" />
          </i>
          <i className="standard-icon-container p-1">
            <IoSettingsSharp className="standard-icon" />
          </i>
        </div>
      </div>
      <div
        id="chat-messages"
        ref={chatMessagesRef}
        className="text-gray-200 flex flex-col space-y-6 my-3 flex-1 overflow-auto"
      >
        {/* Chat messages go here */}
        {conversationHistory &&
          conversationHistory.map((msg) => (
            <div className="chat-message ml-6 rounded-md" key={msg.messageId}>
              <div className="flex items-start space-x-3">
                {/* Avatar, loaded only once on connection for optimization*/}
                <img
                  src={`data:image/${
                    msg.sentBy == selectedFriend.username
                      ? selectedFriend.avatarImageType || "jpeg"
                      : currentUser.avatarImageType || "jpeg"
                  };base64,${
                    msg.sentBy == selectedFriend.username
                      ? selectedFriend.avatar || "../assets/sunrise2.jpg"
                      : currentUser.avatar || "../assets/sunrise2.jpg"
                  }`}
                  className="w-11 h-11 rounded-full mr-2"
                />
                {/* Right side: Name, Timestamp, Message */}
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-md">{msg.sentBy || "Unknown"}</p>
                    <span className="text-gray-400/70 text-xs font-semibold">
                      {new Date(msg.timestamp).toLocaleString() || "Unknown"}
                    </span>
                  </div>
                  {/* Uses block element alignment rather than flex-col */}
                  <p className="text-gray-300 max-w-3xl break-words">
                    {msg.message || ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div
        id="chat-input-box"
        className="flex items-center px-2 bg-gray-800/70 rounded-lg"
      >
        <div className="flex items-center space-x-3 mr-3">
          <i>
            <FaPlus className="text-2xl cursor-pointer" />
          </i>
          <i>
            <MdEmojiEmotions className="text-2xl cursor-pointer" />
          </i>
        </div>
        <textarea
          id="chat-input"
          placeholder="Type a message..."
          className="w-full p-2 m-2 rounded-lg text-white min-h-1 bg-gray-700/40 resize-none hideScrollBar outline-none"
          rows={inputSettings.focus ? inputSettings.inputRowCount : 1}
          onFocus={(e) => {
            e.stopPropagation();
            setInputSettings((prev) => ({ ...prev, focus: true }));
          }}
          onBlur={(e) => {
            e.stopPropagation();
            setInputSettings((prev) => ({ ...prev, focus: false }));
          }}
          onKeyDown={(e) => {
            e.stopPropagation();

            // If Shift + Enter, allow newline without increasing row count
            if (e.key === "Enter" && e.shiftKey) {
              // Set limit of rows to 6
              if (inputSettings.inputRowCount >= 6) return;
              setInputSettings((prevSettings) => ({
                ...prevSettings,
                inputRowCount: prevSettings.inputRowCount + 1,
              }));
            }
            // If Enter (without Shift), send message
            else if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent newline insertion
              if (socket) {
                console.log("SELECTED FRIEND:", selectedFriend);
                socket.emit("send-message", {
                  chatroomId: selectedFriend?.chatroomId,
                  message: e.target.value,
                });
                e.target.value = "";
                setInputSettings((prevSettings) => ({
                  ...prevSettings,
                  inputRowCount: 1,
                }));
              }
            }
            // Handle backspace to decrease row count if at the end of a line
            // This works by checking if the cursor is at the end of the last line (\n)
            // and then update React state to decrease the row count. The browser
            // automatically handles the textarea height and merge lines.
            else if (e.key === "Backspace") {
              const textBeforeCursor = e.target.value.slice(
                0,
                e.target.selectionStart
              );
              const lastNewLineIndex = textBeforeCursor.lastIndexOf("\n");
              const newLineCount = e.target.value.split("\n").length;
              if (
                e.target.selectionStart === lastNewLineIndex + 1 &&
                newLineCount <= 6
              ) {
                setInputSettings((prevSettings) => ({
                  ...prevSettings,
                  inputRowCount: Math.max(prevSettings.inputRowCount - 1, 1),
                }));
              }
            }
          }}
        ></textarea>
      </div>
    </div>
  );
}

export { ChatPanel };
