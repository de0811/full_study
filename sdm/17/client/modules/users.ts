import { createAction, createSlice } from "@reduxjs/toolkit";
import { log } from "console";

export interface User {
  email: string;
  name: string;
  snsId: string;
  password: string;
}


const initialState = {
  myInfo: {
    email: "",
    name: "",
    snsId: "",
    password: "",
  },
  users : [] as User[],
} 

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.email !== action.payload);
    },
    editUser: (state, action) => {
      state.users = state.users.map(user => user.email === action.payload.email ? action.payload : user);
      state.myInfo = action.payload;
    },
    login: (state, action) => {
      state.myInfo = action.payload;
    },
    logout: (state, action) => {
      state.myInfo = initialState.myInfo;
    },
    
  }
})

export const { addUser, removeUser, editUser } = usersSlice.actions;
export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;

