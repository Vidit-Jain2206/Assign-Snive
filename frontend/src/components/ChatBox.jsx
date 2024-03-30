import React from "react";
import { getSender, getSenderStatus } from "../utils/helper";
import { Messages } from "./Messages";
import Lottie from "lottie-react";
import animationData from "../animations/typing.json";

const ChatBox = ({
  chat,
  user,
  messages,
  isTyping,
  newMessage,
  handletyping,
  sendLoading,
  handleMessageSend,
}) => {
  return (
    <div className="mt-[2rem] bg-white rounded-md ">
      <div className="rounded-md">
        {/* topbar */}
        <div className="w-full bg-[#403d71] flex flex-col p-2">
          <h3 className="text-white ">
            {chat && chat.users.length > 1 && getSender(user, chat?.users)}
          </h3>
          <h5 className="text-white text-sm">
            {chat && chat.users.length > 1 && getSenderStatus(user, chat.users)
              ? "Online"
              : "Offline"}
          </h5>
        </div>
        {/* message box */}
        <div className="w-full min-h-[30rem]">
          <ul className="flex flex-col px-4">
            <Messages messages={messages} />
          </ul>
        </div>
        {isTyping ? (
          <Lottie
            loop={true}
            animationData={animationData}
            style={{
              marginBottom: "15px",
              marginLeft: 0,
              width: "45px",
              height: "25px",
            }}
          ></Lottie>
        ) : (
          <p></p>
        )}
        {/* input field */}
        <div className="flex flex-row border-2 border-[#403d71]">
          <input
            className="w-[90%] p-2"
            type="text"
            placeholder="Enter message"
            value={newMessage}
            onChange={handletyping}
          />
          <button
            className="w-[10%] border-1 border-[#403d71] bg-[#403d71] text-[#8da4f1]"
            disabled={sendLoading}
            onClick={handleMessageSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
