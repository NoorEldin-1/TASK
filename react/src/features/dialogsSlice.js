import { createSlice } from "@reduxjs/toolkit";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: "no dialogs",
  reducers: {
    openDialog: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { openDialog } = dialogsSlice.actions;
export default dialogsSlice.reducer;
