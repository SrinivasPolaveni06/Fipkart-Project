import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartList: [],
  modal: false,
  token: false,
  text: "",
  user: { name: "", email: "" },
};

const cartCountSlice = createSlice({
  name: "cartCountSlice",
  initialState,
  reducers: {
    cartListCount: (state, action) => {
      state.cartCount = action.payload.length;
      state.cartList = action.payload;
    },
    modalController: (state, action) => {
      state.modal = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload;
    },
    userSearchText: (state, action) => {
      state.text = action.payload;
    },
    userDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {cartListCount,modalController,userLogin,
  userSearchText,
  userDetails,
  getProductId,
} = cartCountSlice.actions;
export default cartCountSlice.reducer;
