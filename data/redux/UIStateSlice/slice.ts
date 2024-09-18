import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = "expanded" | "collapsed" | "full";

type UIStateSlice = {
  uiState: UIState;
};

const initialState: UIStateSlice = {
  uiState: "expanded",
};

const uiState = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setUIState: (state, action: PayloadAction<UIState>) => {
      state.uiState = action.payload;
    },
  },
});

export const { setUIState } = uiState.actions;

export default uiState.reducer;
