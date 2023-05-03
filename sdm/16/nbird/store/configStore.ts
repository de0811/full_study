import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import reducer from "./reducer";

const configStore = () => {
  const store = createStore(reducer);
  return store;
}
  
const wrapper = createWrapper(configStore, { 
  debug: true 
  // debug: process.env.NODE_ENV === 'development',
});

export default wrapper;