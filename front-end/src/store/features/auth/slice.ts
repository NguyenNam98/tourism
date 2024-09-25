// create an auth slice that will handle the authentication state of the user

import { createSlice } from "@reduxjs/toolkit";

import { login } from "./api.ts";
import { TAuthState } from "./entity";

const initialState: TAuthState = {
  user: null,
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    // builder.addMatcher(login.matchFulfilled, (state, action) => {
    //   state.token = action.payload.jwt;
    //   state.user = action.payload.user;
    // });
    builder.addMatcher(login.matchRejected, (state) => {
      state.token = null;
    });
  },
});

export const { setUserCredential, setError, logout } = authSlice.actions;
