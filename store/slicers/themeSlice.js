import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
  isMobile: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    CHANGE_THEME: (state, action) => {
      localStorage.setItem(
        "theme",
        JSON.stringify({ isDarkSettled: action.payload })
      );
      state.isDark = action.payload;
    },
    CHANGE_IS_MOBILE: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const themeDarkStatus = (state) => state.theme.isDark;
export const themeIsMobileStatus = (state) => state.theme.isMobile;

export const { CHANGE_THEME, CHANGE_IS_MOBILE } = themeSlice.actions;

export default themeSlice.reducer;
