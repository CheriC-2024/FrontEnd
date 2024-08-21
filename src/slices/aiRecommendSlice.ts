import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AIRecommendState {
  ailabel: string[];
  aiThemes: string[];
  aiThemeReason: string[];
  aiTitle: string;
  aiTitleReason: string;
}

const initialState: AIRecommendState = {
  ailabel: [],
  aiThemes: [],
  aiThemeReason: [],
  aiTitle: '',
  aiTitleReason: '',
};

const aiRecommendSlice = createSlice({
  name: 'aiRecommend',
  initialState,
  reducers: {
    setAILabel: (state, action: PayloadAction<string[]>) => {
      state.ailabel = action.payload;
    },
    setAIThemes: (state, action: PayloadAction<string[]>) => {
      state.aiThemes = action.payload;
    },
    setAIThemeReason: (state, action: PayloadAction<string[]>) => {
      state.aiThemeReason = action.payload;
    },
    setAITitle: (state, action: PayloadAction<string>) => {
      state.aiTitle = action.payload;
    },
    setAITitleReason: (state, action: PayloadAction<string>) => {
      state.aiTitleReason = action.payload;
    },
  },
});

export const {
  setAILabel,
  setAIThemes,
  setAIThemeReason,
  setAITitle,
  setAITitleReason,
} = aiRecommendSlice.actions;

export default aiRecommendSlice.reducer;
