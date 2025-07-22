import { configureStore } from "@reduxjs/toolkit";
import dialogsReducer from "./features/dialogsSlice";
import collectionsReducer from "./features/collectionsSlice";
import tasksReducer from "./features/tasksSlice";
import alertReducer from "./features/alertSlice";

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    collections: collectionsReducer,
    tasks: tasksReducer,
    alert: alertReducer,
  },
});
