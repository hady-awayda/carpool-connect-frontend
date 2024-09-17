// addressSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationProps } from "@/components/homeScreenComponents/interfaces";

const initialState = {
  addressList: [],
  location: {
    name: "Fetching...",
    coords: null,
  },
  departure: {
    name: "",
    coords: null,
  },
  destination: {
    name: "",
    coords: null,
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressList: (state, action: PayloadAction<any>) => {
      state.addressList = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationProps>) => {
      state.location = action.payload;
    },
    setDeparture: (state, action: PayloadAction<LocationProps>) => {
      state.departure = action.payload;
    },
    setDestination: (state, action: PayloadAction<LocationProps>) => {
      state.destination = action.payload;
    },
  },
});

export const {
  updateAddressList,
  setLocation,
  setDeparture,
  setDestination,
} = addressSlice.actions;

export default addressSlice.reducer;
