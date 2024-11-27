import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  selectedThemes: string[];
  selectedAiThemes: string[];
}

const initialState: ThemeState = {
  selectedThemes: [],
  selectedAiThemes: [],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    addTheme: (
      state,
      action: PayloadAction<{ name: string; isAI: boolean }>,
    ) => {
      const { name, isAI } = action.payload;
      if (
        state.selectedThemes.length < 3 &&
        !state.selectedThemes.includes(name)
      ) {
        state.selectedThemes.push(name);
        if (isAI) {
          state.selectedAiThemes.push(name); // AI 테마일 경우 AI 테마 배열에도 추가
        }
      }
    },
    removeTheme: (state, action: PayloadAction<string>) => {
      state.selectedThemes = state.selectedThemes.filter(
        (theme) => theme !== action.payload,
      );
      state.selectedAiThemes = state.selectedAiThemes.filter(
        (theme) => theme !== action.payload,
      ); // AI 테마 배열에서도 제거
    },
    resetThemeState() {
      return initialState;
    },
  },
});

export const { addTheme, removeTheme, resetThemeState } = themeSlice.actions;
export default themeSlice.reducer;
