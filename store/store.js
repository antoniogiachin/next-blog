import { configureStore } from "@reduxjs/toolkit";

// slicers-reducers
import themeReducer from "./slicers/themeSlice";
import appStatusReducer from "./slicers/appStatusSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    status: appStatusReducer,
  },
});
