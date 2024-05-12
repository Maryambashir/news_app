import { configureStore } from '@reduxjs/toolkit';
import preferenceReducer from './reducer/preferences';

const store = configureStore({
  reducer: {
    preferences: preferenceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
