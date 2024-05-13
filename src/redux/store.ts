import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import preferenceReducer from './reducer/preferences';
import { PreferenceState } from '../types/PreferencesType';

export interface RootState {
  preferences: PreferenceState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  preferences: preferenceReducer
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    console.error('unable to save state')
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState 
});

store.subscribe(() => {
  saveState(store.getState());
});


export default store;
