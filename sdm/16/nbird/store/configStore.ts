// store/configStore.ts
import { createWrapper } from "next-redux-wrapper";
// import { createStore } from "redux"; //toolkit으로 대체
import reducer from "../modules";
import { configureStore } from "@reduxjs/toolkit";

const makeStore = () => configureStore(reducer);

  
const wrapper = createWrapper(makeStore, { 
  // debug: true 
  debug: process.env.NODE_ENV === 'development',
});
// 따로 디버그 설정을 하지 않는다면 createWrapper의 두번째 인자는 필요 없음

export default wrapper;