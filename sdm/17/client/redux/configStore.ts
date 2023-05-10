// store/configStore.ts
// import { createWrapper } from "next-redux-wrapper";
// import { createStore } from "redux"; //toolkit으로 대체
import rootReducer from "@/redux/reducer";
import { configureStore } from "@reduxjs/toolkit";

// SSR을 위한 함수
// 클라이언트와 서버에서 다른 초기 상태를 가질 수 있기 때문에 서버에서 초기 상태를 가져옴
function getServerState() {
  // document 가 정의되어 있지 않다면 클라이언트에서 실행되고 #__NEXT_DATA__ 를 찾아서 초기 상태를 가져옴
  // return typeof document !== 'undefined' ? JSON.parse(document.querySelector('#__NEXT_DATA__').textContent)?.props.pageProps.initialState : undefined;
  if (typeof window === "undefined") return undefined;
  const nextData = document?.querySelector("#__NEXT_DATA__")?.textContent;
  if (!nextData) return undefined;
  return JSON.parse(nextData)?.props.pageProps.initialState;
}

const configStoreSettings = {
  debug: process.env.NODE_ENV === "development",
  reducer: rootReducer,
  // 크롬 확장 프로그램으로 redux 상태를 확인할 수 있음
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
  preloadedState: getServerState(),
};
const makeStore = () => configureStore(configStoreSettings);
// const makeStore = configureStore(configStoreSettings);

// const wrapper = createWrapper(makeStore, {
  // debug: process.env.NODE_ENV === "development",
// });

// export default wrapper;
export default makeStore;
