import { createAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./myInfo";


const initialState = {
  myInfo: {
    email: "",
    name: "",
    snsId: "",
    password: "",
  } as User,
  users : [] as User[],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("Add User Start", action.payload);
      state.users.push(action.payload);
      console.log("Add User End", state.users);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.email !== action.payload);
    },
    editUser: (state, action) => {
      state.users = state.users.map(user => user.email === action.payload.email ? action.payload : user);
      state.myInfo = action.payload;
    },
  }
})

export const { addUser, removeUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;

