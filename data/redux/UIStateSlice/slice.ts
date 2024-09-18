import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = "collapsed" | "expanded" | "full";

interface UIStateSlice {
  uiState: UIState;
  isAnimationComplete: boolean;
}

const initialState: UIStateSlice = {
  uiState: "collapsed",
  isAnimationComplete: false,
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
  },
});

export const { setUIState, setAnimationComplete } = uiStateSlice.actions;
export default uiStateSlice.reducer;
