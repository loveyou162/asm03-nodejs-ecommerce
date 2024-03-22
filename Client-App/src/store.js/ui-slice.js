import { createSlice } from "@reduxjs/toolkit";

const initialState = { showPopup: false, selectedProduct: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    selectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    showPopup(state) {
      state.showPopup = true;
    },
    hidePopup(state) {
      state.showPopup = false;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
