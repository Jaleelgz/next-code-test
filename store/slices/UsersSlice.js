import { createSlice } from "@reduxjs/toolkit";

const defaultState = [];

export const UsersSlice = createSlice({
  name: "users",

  initialState: {
    value: defaultState,
  },

  reducers: {
    setAllUsers: (state, action) => {
      state.value = action.payload;
    },
    clearAllUsers: (state) => {
      state.value = defaultState;
    },
  },
});

export const { setAllUsers, clearAllUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
