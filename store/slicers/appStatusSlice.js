import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

export const appStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    SET_LOADING_STATUS: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const isLoadingStatus = (state) => state.status.isDark;
export const errorStatus = (state) => state.status.isMobile;

export const { SET_LOADING_STATUS, SET_ERROR } = appStatusSlice.actions;

export default appStatusSlice.reducer;
