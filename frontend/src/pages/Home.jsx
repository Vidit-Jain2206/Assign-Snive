import React, { useState } from "react";
import { createUser } from "../server/user";
import { useNavigate } from "react-router-dom";
import { Spinner, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await createUser(username);
      setLoading(false);
      dispatch(signInUser(data.user));
      navigate("/chats");
      toast({
        title: "User Created Successfully",
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

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-purple">
      <div className="w-[95%] sm:w-[80%] md:w-[40%] lg:w-[30%] p-4 flex flex-col justify-center items-center rounded-xl bg-white">
        <div className="flex flex-col justify-center items-center w-[90%]">
          <h1 className="text-[#5d5b8d] font-bold text-3xl text-center">
            TALKS
          </h1>
          <input
            className="mt-[1rem] p-[10px] w-full border-b-2 border-b-gray-300 text-gray-600"
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="font-semibold flex flex-row items-center justify-center text-lg mt-[1rem] bg-purple text-white w-full px-10 py-1 border-2 border-[#8da4f1] active:bg-white active:text-[#8da4f1] hover:bg-white hover:text-[#8da4f1] "
          >
            Submit
            {loading && (
              <Spinner
                className="ml-[1rem] text-4xl"
                size="4xl"
                color="#8da4f1"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
