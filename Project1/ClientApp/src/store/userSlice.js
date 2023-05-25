import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
