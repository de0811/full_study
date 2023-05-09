import { combineReducers } from "redux";
import { User, myInfoSlice } from './myInfo';
import reducer from '@/redux/reducer';
import { usersSlice } from "./users";

const rootReducers = combineReducers({
  // ...other reducers
  users: usersSlice.reducer,
  myInfo: myInfoSlice.reducer,
  // ...other reducers
});

export default rootReducers;

export interface RootState {
  myInfo: User;
  users: User[];
  isLogin: boolean;
}
