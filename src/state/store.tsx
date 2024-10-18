// redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import audioReducer from './audio/audioReducer';

const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
