import { createAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  email: string;
  name: string;
  snsId: string;
  password: string;
  isLogin: boolean;
}

const initialState: User = {
    email: "",
    name: "",
    snsId: "",
    password: "",

    isLogin: false,
};

export const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login Start", action.payload);
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.snsId = action.payload.snsId;
      state.password = action.payload.password;
      state.isLogin = true;
      console.log("Login End", state);
    },
    logout: (state, action) => {
      Object.assign(state, initialState);
      // state.email = initialState.email;
      // state.name = initialState.name;
      // state.snsId = initialState.snsId;
      // state.password = initialState.password;
      state.isLogin = false;
    },
    
  }
})

export const { login, logout } = myInfoSlice.actions;

export default myInfoSlice.reducer;

