import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isGlobalLoading: false,
  error: null,
  showNotification: false,
  notificationSeverity: null,
  notificationText: null,
};

export const appStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    SET_LOADING_STATUS: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_GLOBAL_LOADING_STATUS: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    SET_NOTIFICATION: (state, action) => {
      state.showNotification = action.payload.show;
      state.notificationSeverity = action.payload.severity;
      state.notificationText = action.payload.text;
    },
    RESET_NOTIFICATION: (state) => {
      state.showNotification = false;
      state.notificationSeverity = null;
      state.notificationText = null;
    },
  },
});

export const isLoadingStatus = (state) => state.status.isLoading;
export const isGlobalLoadingStatus = (state) => state.status.isGlobalLoading;
export const errorStatus = (state) => state.status.error;
export const showNotificationStatus = (state) => state.status.showNotification;
export const notificationSeverityStatus = (state) =>
  state.status.notificationSeverity;
export const notificationTextStatus = (state) => state.status.notificationText;

export const {
  SET_LOADING_STATUS,
  SET_GLOBAL_LOADING_STATUS,
  SET_ERROR,
  SET_NOTIFICATION,
  RESET_NOTIFICATION,
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
