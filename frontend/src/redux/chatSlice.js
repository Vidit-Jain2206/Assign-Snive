import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
