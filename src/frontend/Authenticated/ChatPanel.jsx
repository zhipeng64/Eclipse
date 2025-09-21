import { useState, useContext, useEffect } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import SocketContext from "../Context/Socket.jsx";

function ChatPanel() {
  // Get the socket and selectedChat from context
  const { socket, selectedChat, conversationHistory, setConversationHistory } =
    useContext(SocketContext);
  const [inputSettings, setInputSettings] = useState({
    inputRowCount: 1,
    focus: false,
  });

  // Clears previous conversation history and fetches new history when selectedChat changes
  useEffect(() => {
    if (selectedChat && socket) {
      setConversationHistory([]);
      socket.emit("conversation", selectedChat.chatroomId);
    }
  }, [selectedChat, socket]);
  console.log("Conversation History in ChatPanel:", conversationHistory);
  if (selectedChat === null) {
    // Render everything below but with placeholder
    return (
      <div
        id="chat-panel"
        className="justify-center items-center text-gray-400 dlayer-3 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow"
      >
        Select a friend to chat with on the left panel
      </div>
    );
  }
  return (
    <div
      id="chat-panel"
      className="text-white dlayer-3 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow"
    >
      <div
        id="recipient"
        className="flex items-center justify-between px-5 py-2 opac-shadow"
      >
        <div className="flex items-center">
          <img
            src={`data:image/jpg;base64,${selectedChat?.avatar}`}
            alt="Avatar"
            className="w-11 h-11 rounded-full mr-2"
          />
          <p className="text-md">
            {selectedChat ? selectedChat.username : "Unknown"}
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
        className="text-gray-200 flex flex-col space-y-6 my-3 flex-1 overflow-auto"
      >
        {/* Chat messages go here */}
        {conversationHistory &&
          conversationHistory.map((msg) => (
            <div className="chat-message ml-6 rounded-md" key={msg.messageId}>
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <img
                  src={`data:image/jpg;base64,${msg.avatar}`}
                  alt="Avatar"
                  className="w-11 h-11 rounded-full"
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
        className="flex items-center px-2 layer-1 rounded-lg"
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
          className="w-full p-2 m-2 rounded-lg text-white min-h-1 layer-2 resize-none hideScrollBar outline-none"
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
                socket.emit(
                  "send-message",
                  selectedChat?.chatroomId,
                  e.target.value
                );
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
