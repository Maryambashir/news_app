import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PreferenceState } from '../../types/PreferencesType';

const initialState: PreferenceState = {
    sources: [],
    authors: [],
    categories: []
};

const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<PreferenceState>) => {
        state.sources = action.payload.sources
        state.authors = action.payload.authors
        state.categories = action.payload.categories
    }
  }
});

export const { setPreferences } = preferenceSlice.actions;
export default preferenceSlice.reducer;
