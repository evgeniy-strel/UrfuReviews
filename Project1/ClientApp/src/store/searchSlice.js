import { createSlice } from '@reduxjs/toolkit';
import { searchFilters } from '../const.ts';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    tracks: [],
    text: '',
    filteredBy: searchFilters.Track,
  },
  reducers: {
    setTextSearch(state, action) {
      state.text = action.payload;
    },
    setFilteredBySearch(state, action) {
      state.filteredBy = action.payload;
    },
    setSearchTracks(state, action) {
      state.tracks = action.payload;
    },
    resetSearchState(state) {
      state.tracks = [];
      state.text = '';
      state.filteredBy = searchFilters.Track;
    },
  },
});

export const { setTextSearch, setFilteredBySearch, setSearchTracks, resetSearchState } =
  searchSlice.actions;

export const searchReducer = searchSlice.reducer;
