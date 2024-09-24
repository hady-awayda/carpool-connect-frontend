import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DaysState = {
  selectedDays: Record<string, boolean>;
};

const initialState: DaysState = {
  selectedDays: {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  },
};

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    toggleDay: (state, action: PayloadAction<string>) => {
      const day = action.payload;
      state.selectedDays[day] = !state.selectedDays[day];
    },
    setSelectedDays: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.selectedDays = action.payload;
    },
  },
});

export const { toggleDay, setSelectedDays } = daysSlice.actions;

export default daysSlice.reducer;
