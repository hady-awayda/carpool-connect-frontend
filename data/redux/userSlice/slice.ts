import { UserState } from "@/interfaces/userData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  name: null,
  email: null,
  role: null,
  courses: [],
  withdrawals: [],
  createdAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
    setCourses: (state, action: PayloadAction<string[]>) => {
      state.courses = action.payload;
    },
    setWithdrawals: (state, action: PayloadAction<string[]>) => {
      state.withdrawals = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<string | null>) => {
      state.createdAt = action.payload;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const {
  setName,
  setEmail,
  setRole,
  setCourses,
  setWithdrawals,
  setCreatedAt,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
