import { createSlice } from "@reduxjs/toolkit";

const initialStateLogin = {
  islogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialStateLogin,
  reducers: {
    ON_LOGIN(state) {
      console.log("ON_LOGIN");
      state.islogin = true;
    },
    logout(state) {
      state.islogin = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
