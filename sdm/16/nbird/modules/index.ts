import { combineReducers } from "redux";
import { usersSlice } from "./users";

const rootReducers = combineReducers({
  // ...other reducers
  users: usersSlice.reducer,
  // ...other reducers
});

export default rootReducers;
