import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userID: null,
    username: null,
    stateChange: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      username: payload.username,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
  },
});
