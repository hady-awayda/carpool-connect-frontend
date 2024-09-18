import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = "collapsed" | "expanded" | "full" | "sheet-expanded";

interface UIStateSlice {
  uiState: UIState;
  isAnimationComplete: boolean;
  focusedField:
    | "departure"
    | "destination"
    | "departureTime"
    | "destinationTime"
    | null;
}

const initialState: UIStateSlice = {
  uiState: "collapsed",
  isAnimationComplete: false,
  focusedField: "destination",
};

const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setUIState: (state, action: PayloadAction<UIState>) => {
      state.uiState = action.payload;
    },
    setAnimationComplete: (state, action: PayloadAction<boolean>) => {
      state.isAnimationComplete = action.payload;
    },
    setFocusedField: (
      state,
      action: PayloadAction<UIStateSlice["focusedField"]>
    ) => {
      state.focusedField = action.payload;
    },
  },
});

export const { setUIState, setAnimationComplete, setFocusedField } =
  uiStateSlice.actions;
export default uiStateSlice.reducer;
