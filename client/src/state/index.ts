import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initalStateType {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initalStateType = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const gloabalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = gloabalSlice.actions;
export default gloabalSlice.reducer;
