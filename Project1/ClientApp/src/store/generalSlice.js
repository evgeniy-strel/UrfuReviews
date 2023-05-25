import { createSlice } from '@reduxjs/toolkit';
import {
  authLogin,
  authMe,
  fetchReviews,
  fetchSubjects,
  fetchTrack,
  searchTracks,
} from './api-actions';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    isLoading: {
      subjects: {
        init: undefined,
        showMore: undefined,
      },
      track: {
        track: undefined,
        reviews: {
          init: undefined,
          showMore: undefined,
        },
      },
      search: undefined,
      user: true,
    },
  },
  reducers: {
    setLoadingTrue(state, action) {
      state.isLoading = true;
    },
    setLoadingFalse(state, action) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchTrack.pending, (state) => {
      state.isLoading.track.track = true;
    });
    builder.addCase(fetchReviews.pending, (state, action) => {
      const limitReviews = action.meta.arg?.limit;
      if (limitReviews === 8) {
        state.isLoading.track.reviews.init = true;
      } else {
        state.isLoading.track.reviews.showMore = true;
      }
    });
    builder.addCase(fetchSubjects.pending, (state, action) => {
      const limitSubjects = action.meta.arg?.limit;
      if (limitSubjects === 6) {
        state.isLoading.subjects.init = true;
      } else {
        state.isLoading.subjects.showMore = true;
      }
    });
    builder.addCase(authMe.pending, (state) => {
      state.isLoading.user = true;
    });
    builder.addCase(searchTracks.pending, (state) => {
      state.isLoading.search = true;
    });
    //fulfilled
    builder.addCase(fetchTrack.fulfilled, (state) => {
      state.isLoading.track.track = false;
    });
    builder.addCase(fetchReviews.fulfilled, (state) => {
      state.isLoading.track.reviews.init = false;
      state.isLoading.track.reviews.showMore = false;
    });
    builder.addCase(fetchSubjects.fulfilled, (state) => {
      state.isLoading.subjects.init = false;
      state.isLoading.subjects.showMore = false;
    });
    builder.addCase(authMe.fulfilled, (state) => {
      state.isLoading.user = false;
    });
    builder.addCase(searchTracks.fulfilled, (state) => {
      state.isLoading.search = false;
    });
  },
});

export const { setLoadingTrue, setLoadingFalse } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
