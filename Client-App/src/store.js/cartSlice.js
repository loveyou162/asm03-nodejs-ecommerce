import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: null,
    totalAmount: 0,
    cartItemData: JSON.parse(localStorage.getItem("cartItem")) || [],
  },
  reducers: {
    updateCart(state, action) {
      console.log("update");
      const item = action.payload;
      const totalArr = item.map((item) => item.productId.price * item.quantity);
      console.log(totalArr);
      const totalAmount =
        totalArr.length > 0 ? totalArr.reduce((acc, item) => acc + item) : 0;
      console.log(totalAmount);
      state.totalAmount = totalAmount;
    },
    addCart(state, action) {
      const itemId = action.payload;

      axios
        .post(
          `https://asm03-nodejs-server.onrender.com/shop/add-cart`,
          { productId: itemId },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          // Xử lý kết quả nếu cần
          console.log(response.data);
          // state.totalQuantity = response.data.quantity;
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Error sending cart data:", error);
        });
    },
    decrement(state, action) {
      const itemId = action.payload;
      axios
        .post(
          `https://asm03-nodejs-server.onrender.com/shop/decrement-cart`,
          { productId: itemId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data.quantity);
          state.totalQuantity = response.data.quantity;
        })
        .catch((err) => {
          console.log(err);
        });
      state.totalQuantity--;
    },
    remove_cart(state, action) {
      const itemId = action.payload;
      axios
        .post(
          `https://asm03-nodejs-server.onrender.com/shop/delete-cart`,
          { productId: itemId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
