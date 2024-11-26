import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

interface AIRecommendState {
  aiLabel: string[];
  aiThemes: string[];
  aiThemeReason: string[];
  aiTitles: string[];
  aiTitleReason: string[];
  cloudVisionLabels: CloudVisionLabel[];
  prevSelectedArt: number[];
}

const initialState: AIRecommendState = {
  aiLabel: [],
  // TODO: 시연용 데이터 추가하기
  aiThemes: [
    '추천 테마 1번',
    '추천 테마 2번',
    '추천 테마 3',
    '추천 테마 4',
    '추천 테마5입니다아',
  ],
  aiThemeReason: [
    '설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다.',
    '설명 입니다adsadsaawd.wad awd설명 입efe니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다.',
  ],
  aiTitles: [
    '제목1',
    '제목 이건 2번',
    'Hello Hi',
    '체리시',
    '이건는 제목: 이거는 제목',
  ],
  aiTitleReason: [
    '설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다.',
    '설명 입니다adsadsaawd.wad awd설명 입efe니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다. 설명 입니다.',
  ],
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
