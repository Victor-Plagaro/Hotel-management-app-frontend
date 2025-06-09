import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
export type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
}

const initialState: ThemeState = {
  theme:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
};

// Updates the `data-theme` attribute on loading
const root = document.documentElement;
root.setAttribute(
  "data-theme",
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;

      const root = document.documentElement;
      root.setAttribute("data-theme", action.payload);
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
