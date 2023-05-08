// store/configStore.ts
import { createWrapper } from "next-redux-wrapper";
// import { createStore } from "redux"; //toolkit으로 대체
import rootReducer from "@/modules";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import reducer from '@/modules';

// SSR을 위한 함수
// 클라이언트와 서버에서 다른 초기 상태를 가질 수 있기 때문에 서버에서 초기 상태를 가져옴
function getServerState() {
  // document 가 정의되어 있지 않다면 클라이언트에서 실행되고 #__NEXT_DATA__ 를 찾아서 초기 상태를 가져옴
  // return typeof document !== 'undefined' ? JSON.parse(document.querySelector('#__NEXT_DATA__').textContent)?.props.pageProps.initialState : undefined;
  const nextData = document?.querySelector('#__NEXT_DATA__')?.textContent;
  if( !nextData ) return undefined;
  return JSON.parse(nextData)?.props.pageProps.initialState;
}


/*
interface ConfigStoreSettings {
  debug: boolean;
  reducer: typeof reducer;
  middleware: any;
  preloadedState: any;
}
*/
const configStoreSettings = {
  debug: process.env.NODE_ENV === 'development',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
  preloadedState: getServerState(),
}
const makeStore = () => configureStore(configStoreSettings);
  
const wrapper = createWrapper(makeStore);

export default wrapper;