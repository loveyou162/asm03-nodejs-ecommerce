import { createSlice } from "@reduxjs/toolkit";

const initialCounter = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounter,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
});
export const counterAction = counterSlice.actions;
export default counterSlice.reducer;
