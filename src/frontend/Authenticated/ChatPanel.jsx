import { useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";

function ChatPanel(chatData) {
  const [inputSettings, setInputSettings] = useState({
    inputRowCount: 1,
    focus: false,
  });

  return (
    // To scale this component when used by another component,
    // use width:full and height_full
    <div
      id="chat-panel"
      className="bg-[#08090d] text-white w-full min-h-screen flex flex-col"
    >
      <div
        id="recipient"
        className="flex items-center justify-between px-2 mb-0.5"
      >
        <div className="flex items-center">
          <img
            src="../assets/sunrise2.jpg"
            alt="Avatar"
            className="w-11 h-11 rounded-full mr-2"
          />
          <h2 className="text-md">John Zena</h2>
        </div>
        <div className="flex space-x-7 text-gray-200">
          <i className="text-[1.4rem] cursor-pointer">
            <IoVideocam />
          </i>
          <i className="text-[1.4rem] cursor-pointer">
            <IoMic />
          </i>
          <i className="text-[1.4rem] cursor-pointer">
            <IoSettingsSharp />
          </i>
        </div>
      </div>
      <hr className="text-[#90CDF4] " />
      <div
        id="chat-messages"
        className="text-gray-200 flex flex-col space-y-6 grow-1"
      >
        <div className="chat-message ml-6 rounded-md">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <img
              src="../assets/sunrise2.jpg"
              alt="Avatar"
              className="w-11 h-11 rounded-full"
            />

            {/* Right side: Name, Timestamp, Message */}
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-md font-semibold">John Zena</h2>
                <span className="text-gray-400 text-xs font-semibold">
                  6/20/2025 18:30:50 PM EST
                </span>
              </div>

              {/* Uses block element alignment rather than flex-col */}
              <p className="text-gray-300 max-w-3xl break-words">
                Hey, we need to get some coffee and dumplings too. Huh? Those
                two are such a strange combination, don't you think?
              </p>
            </div>
          </div>
        </div>

        <div className="chat-message ml-6 rounded-md">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <img
              src="../assets/sunrise.jpg"
              alt="Avatar"
              className="w-11 h-11 rounded-full"
            />

            {/* Right side: Name, Timestamp, Message */}
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-md font-semibold">Stewart</h2>
                <span className="text-gray-400 text-xs font-semibold">
                  6/21/2025 12:10:10 PM EST
                </span>
              </div>

              {/* Uses block element alignment rather than flex-col */}
              <p className="text-gray-300 max-w-3xl break-words">
                Dumplings? I prefer something else, like a burgar or pizza.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-[#90CDF4]" />
      <div id="chat-input-box" className="flex items-center px-2 bg-gray-800">
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
          className="w-full p-2 m-2 rounded-lg text-white min-h-1 bg-gray-700 resize-none hideScrollBar"
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

            // Handle Enter key to increase row count
            if (e.key === "Enter") {
              // Set limit of rows to 6
              if (inputSettings.inputRowCount >= 6) return;
              setInputSettings((prevSettings) => ({
                ...prevSettings,
                inputRowCount: prevSettings.inputRowCount + 1,
              }));
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
