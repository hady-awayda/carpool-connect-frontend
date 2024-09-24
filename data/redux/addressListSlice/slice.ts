import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Address,
  LocationProps,
} from "@/components/homeScreenComponents/interfaces";

type AddressState = {
  addressList: Address[];
  location: LocationProps;
  departure: LocationProps;
  destination: LocationProps;
  search: LocationProps;
};

const initialState: AddressState = {
  addressList: [],
  location: {
    name: "Fetching...",
    coords: {
      latitude: 33.90105779618675,
      longitude: 35.500431060791016,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
  },
  departure: {
    name: "",
    coords: {
      latitude: 33.90105779618675,
      longitude: 35.500431060791016,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
  },
  destination: {
    name: "",
    coords: {
      latitude: 33.90105779618675,
      longitude: 35.500431060791016,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
  },
  search: {
    name: "",
    coords: {
      latitude: 33.90105779618675,
      longitude: 35.500431060791016,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
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
    setSearch: (state, action: PayloadAction<LocationProps>) => {
      state.search = action.payload;
    },
  },
});

export const {
  updateAddressList,
  setLocation,
  setDeparture,
  setDestination,
  setSearch,
} = addressSlice.actions;

export default addressSlice.reducer;
