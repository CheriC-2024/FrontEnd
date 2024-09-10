import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

interface AIRecommendState {
  aiLabel: string[];
  aiThemes: string[];
  aiThemeReason: string[];
  aiTitles: string;
  aiTitleReason: string;
  cloudVisionLabels: CloudVisionLabel[];
  prevSelectedArt: number[];
}

const initialState: AIRecommendState = {
  aiLabel: [],
  aiThemes: [],
  aiThemeReason: [],
  aiTitles: '',
  aiTitleReason: '',
  cloudVisionLabels: [],
  prevSelectedArt: [],
};

const aiRecommendSlice = createSlice({
  name: 'aiRecommend',
  initialState,
  reducers: {
    setAILabel: (state, action: PayloadAction<string[]>) => {
      state.aiLabel = action.payload;
    },
    setAIThemes: (state, action: PayloadAction<string[]>) => {
      state.aiThemes = action.payload;
    },
    setAIThemeReason: (state, action: PayloadAction<string[]>) => {
      state.aiThemeReason = action.payload;
    },
    setAITitle: (state, action: PayloadAction<string>) => {
      state.aiTitles = action.payload;
    },
    setAITitleReason: (state, action: PayloadAction<string>) => {
      state.aiTitleReason = action.payload;
    },
    setCloudVisionLabels: (
      state,
      action: PayloadAction<CloudVisionLabel[]>,
    ) => {
      state.cloudVisionLabels = action.payload;
    },
    setPrevSelectedArt: (state, action: PayloadAction<number[]>) => {
      state.prevSelectedArt = action.payload;
    },
  },
});

export const {
  setAILabel,
  setAIThemes,
  setAIThemeReason,
  setAITitle,
  setAITitleReason,
  setCloudVisionLabels,
  setPrevSelectedArt,
} = aiRecommendSlice.actions;

export default aiRecommendSlice.reducer;
