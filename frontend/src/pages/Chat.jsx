import React, { useEffect, useState } from "react";
import { createChat, joinChat } from "../server/chat";
import io from "socket.io-client";
import { createMessage } from "../server/message";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../redux/chatSlice";
import ChatBox from "../components/ChatBox";
import RoomButtons from "../components/RoomButtons";

const ENDPOINT = "http://localhost:8080/";
var socket;
const Chat = () => {
  const [type, setType] = useState("create");
  const [chatId, setChatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT, {
      query: { userId: user._id },
    });
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnection(true);
    });
    socket.on("start typing", (item) => {
      if (user._id !== item._id) {
        setIsTyping(true);
      }
    });
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const handleOnChange = (e) => {
    setType(e.target.value);
  };
  const handleCreateRoom = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await createChat(user);
      setLoading(false);
      dispatch(addChat(data.chat));
      toast({
        title: "Room Created Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleJoinRoom = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await joinChat({ chatId, user });
      setLoading(false);
      socket.emit("join chat", data.chat);
      dispatch(addChat(data.chat));
      setChatId("");
      toast({
        title: "Room Joined Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleMessageSend = async (e) => {
    setSendLoading(true);
    socket.emit("stop typing", chat._id);
    e.preventDefault();
    try {
      const { data } = await createMessage({
        user,
        newMessage,
        chatId: chat._id,
      });
      setNewMessage("");
      setSendLoading(false);
      socket.emit("new message", data.newMessage);
      setMessages([...messages, data.newMessage]);
      toast({
        title: "Message Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setSendLoading(false);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handletyping = async (e) => {
    setNewMessage(e.target.value);
    if (!socketConnection) {
      return;
    }
    if (!typing) {
      setTyping(true);
      socket.emit("start typing", { room: chat?._id, user });
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.on("message received", (msg) => {
      setMessages([...messages, msg]);
    });
    socket.on("joined chat", async (chat) => {
      dispatch(addChat(chat));
    });
  });

  return (
    <div className="w-screen h-screen flex flex-col bg-purple">
      {/* navbar */}
      <div className="w-full p-4 bg-[#403d71] text-[#8da4f1] font-bold text-4xl">
        <h1 className="text-center">Welcome to TALKS</h1>
      </div>

      {/* mainsection */}
      <div className="w-[95%] md:w-[80%] lg:w-[60%] mx-auto mt-[2rem]">
        {/* room details*/}
        <RoomButtons
          type={type}
          handleOnChange={handleOnChange}
          handleCreateRoom={handleCreateRoom}
          loading={loading}
          chatId={chatId}
          setChatId={setChatId}
          handleJoinRoom={handleJoinRoom}
        />
        {/* chat box*/}
        <ChatBox
          chat={chat}
          user={user}
          messages={messages}
          isTyping={isTyping}
          newMessage={newMessage}
          handletyping={handletyping}
          sendLoading={sendLoading}
          handleMessageSend={handleMessageSend}
        />
      </div>
    </div>
  );
};

export default Chat;
