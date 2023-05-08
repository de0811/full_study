import { combineReducers } from "redux";
import { User, usersSlice } from "./users";

const rootReducers = combineReducers({
  // ...other reducers
  users: usersSlice.reducer,
  // ...other reducers
});

export default rootReducers;

export interface RootState {
  users: User[],
  myInfo: User
}