import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    show: false,
    value: "",
  },
  reducers: {
    changeAlert: (state, action) => {
      state.show = action.payload.show;
      state.value = action.payload.value;
    },
  },
});
export const { changeAlert } = alertSlice.actions;
export default alertSlice.reducer;
