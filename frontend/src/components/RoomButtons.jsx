import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const RoomButtons = ({
  type,
  handleOnChange,
  handleCreateRoom,
  loading,
  chatId,
  setChatId,
  handleJoinRoom,
}) => {
  const { chat } = useSelector((state) => state.chat);
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <div className="w-full flex flex-row justify-between items-center border-2 border-[#403d71]">
        <label
          className={`w-[50%] text-center text-2xl font-medium cursor-pointer p-2 ${
            type === "create" ? "bg-[#403d71] text-[#8da4f1]" : ""
          }`}
        >
          <input
            className="cursor-pointer"
            type="radio"
            style={{ display: "none" }}
            onChange={handleOnChange}
            value="create"
            checked={type === "create"}
          />
          Create Room
        </label>

        <label
          className={`w-[50%] text-center text-2xl font-medium cursor-pointer p-2 ${
            type === "join" ? "bg-[#403d71] text-[#8da4f1]" : ""
          }`}
        >
          <input
            className="cursor-pointer"
            type="radio"
            style={{ display: "none" }}
            onChange={handleOnChange}
            value="join"
            checked={type === "join"}
          />
          Join Room
        </label>
      </div>

      <div className="mt-[2rem] w-full flex flex-col justify-center items-center">
        {type === "create" && (
          <>
            <button
              className="bg-[#403d71] w-[70%] mx-auto py-1 text-[#8da4f1] text-2xl"
              onClick={handleCreateRoom}
              disabled={loading}
            >
              Create Room{loading && <Spinner className="ml-[0.5rem]" />}
            </button>
            {chat && (
              <h2 className="w-full text-center text-[#403d71] text-2xl mt-[0.5rem] ">
                Your Room id is:- {chat._id}
              </h2>
            )}
          </>
        )}
        {type === "join" && (
          <div className="flex flex-col justify-center items-center w-full">
            <input
              className="mt-[1rem] p-[10px] w-[70%] text-gray-600 rounded-md"
              type="text"
              placeholder="Enter room Id"
              value={chatId}
              onChange={(e) => {
                setChatId(e.target.value);
              }}
            />
            <button
              className="mt-[1rem] bg-[#403d71] w-[70%] mx-auto py-1 text-[#8da4f1] text-2xl"
              onClick={handleJoinRoom}
              disabled={loading}
            >
              Join Room {loading && <Spinner />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomButtons;
