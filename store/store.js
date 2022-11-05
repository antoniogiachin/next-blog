import { configureStore } from "@reduxjs/toolkit";

// slicers-reducers
import themeReducer from "./slicers/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
