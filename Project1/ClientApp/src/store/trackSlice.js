import { createSlice } from '@reduxjs/toolkit';
import { countAndGetTrackValues } from '../components/usefulMethods/usefulMethods.js';
import {
  resetSubjectsState,
  setOriginalSubjects,
  setSelectedSubject,
  setSemester,
} from './subjectsSlice.js';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    track: undefined,
    teacher: undefined,
    sortedReviewsBy: undefined,
    reviews: [],
    limit: 8,
  },
  reducers: {
    setTrack(state, action) {
      state.track = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setSortedReviewsBy(state, action) {
      state.sortedReviewsBy = '';
    },
    setTeacher(state, action) {
      state.teacher = action.payload;
    },
    addLimitReviews(state) {
      state.limit += 8;
    },
    resetTrack(state) {
      state.track = undefined;
      state.teacher = undefined;
      state.sortedReviewsBy = undefined;
      state.reviews = [];
      state.limit = 8;
    },
  },
});

export const { setTrack, setReviews, setTeacher, addLimitReviews, resetTrack } = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
