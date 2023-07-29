import { createSlice } from "@reduxjs/toolkit";

export const DrawerSlice = createSlice({
  name: "drawer",
  initialState: {
    value: true,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.value = !state.value;
    },
    closeDrawer: (state) => {
      state.value = false;
    },
    openDrawer: (state) => {
      state.value = true;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = DrawerSlice.actions;

export default DrawerSlice.reducer;
