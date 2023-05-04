import { createAction, createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  snsId: string;
  password: string;
}


const initialState = {
  users: [] as User[],
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
    },
  }
})

export const { addUser, removeUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;

