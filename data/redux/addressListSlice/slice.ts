import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressList: (state, action: PayloadAction<any>) => {
      state.addressList = action.payload;
    },
  },
});

export const { updateAddressList } = addressSlice.actions;

export default addressSlice.reducer;
