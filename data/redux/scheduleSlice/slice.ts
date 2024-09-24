import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravelState {
  departureTime: string;
  destinationTime: string;
  travelMode: "rider" | "passenger" | "partnership";
}

const initialState: TravelState = {
  departureTime: "",
  destinationTime: "",
  travelMode: "rider",
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setDepartureTime: (state, action: PayloadAction<string>) => {
      state.departureTime = action.payload;
    },
    setDestinationTime: (state, action: PayloadAction<string>) => {
      state.destinationTime = action.payload;
    },
    setTravelMode: (
      state,
      action: PayloadAction<"rider" | "passenger" | "partnership">
    ) => {
      state.travelMode = action.payload;
    },
  },
});

export const { setDepartureTime, setDestinationTime, setTravelMode } =
  travelSlice.actions;

export default travelSlice.reducer;
