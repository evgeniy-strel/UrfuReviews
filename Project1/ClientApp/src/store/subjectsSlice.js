import { createSlice } from '@reduxjs/toolkit';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    count: undefined,
    limit: 6,
    semester: 'all',
  },
  reducers: {
    setSubjects(state, action) {
      state.subjects = action.payload;
    },
    setSemester(state, action) {
      state.semester = action.payload;
      state.limit = 6;
    },
    setCountSubjects(state, action) {
      state.count = action.payload;
    },
    addLimitSubjects(state) {
      state.limit += 6;
    },
    resetSubjectsState(state, action) {
      state.semester = 'all';
    },
  },
});

export const { setSubjects, setSemester, setCountSubjects, addLimitSubjects, resetSubjectsState } =
  subjectsSlice.actions;

export const subjectsReducer = subjectsSlice.reducer;
