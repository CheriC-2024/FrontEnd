import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoverState {
  selectedCover: string[]; // 선택된 커버 상태
  selectedCoverImage: string | null; // 업로드된 이미지 상태
  colorPalettes: string[][];
  randomPalettes: { palette: string[]; index: number }[];
  coverType: 'gradient' | 'solid' | 'image';
  selectedPalette: string[]; // 선택된 팔레트 상태 추가
  coverColors: string[]; // 선택된 커버 색상 추가
  selectedGradientConfig: {
    colors: string[];
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
}

const initialState: CoverState = {
  selectedCover: [],
  selectedCoverImage: null,
  colorPalettes: [],
  randomPalettes: [],
  coverType: 'gradient',
  selectedPalette: [],
  coverColors: [],
  selectedGradientConfig: null,
};

const coverSlice = createSlice({
  name: 'cover',
  initialState,
  reducers: {
    setSelectedCover: (state, action: PayloadAction<string[]>) => {
      state.selectedCover = action.payload;
    },
    setSelectedCoverImage: (state, action: PayloadAction<string | null>) => {
      state.selectedCoverImage = action.payload;
    },
    setColorPalettes: (state, action: PayloadAction<string[][]>) => {
      state.colorPalettes = action.payload;
    },
    setRandomPalettes: (
      state,
      action: PayloadAction<{ palette: string[]; index: number }[]>,
    ) => {
      state.randomPalettes = action.payload;
    },
    setCoverType: (
      state,
      action: PayloadAction<'gradient' | 'solid' | 'image'>,
    ) => {
      state.coverType = action.payload;
    },
    setSelectedPalette: (state, action: PayloadAction<string[]>) => {
      state.selectedPalette = action.payload;
    },
    setCoverColors: (state, action: PayloadAction<string[]>) => {
      state.coverColors = action.payload;
    },
    setSelectedGradientConfig: (
      state,
      action: PayloadAction<CoverState['selectedGradientConfig']>,
    ) => {
      state.selectedGradientConfig = action.payload;
    },
  },
});

export const {
  setSelectedCover,
  setSelectedCoverImage,
  setColorPalettes,
  setRandomPalettes,
  setCoverType,
  setSelectedPalette,
  setCoverColors,
  setSelectedGradientConfig,
} = coverSlice.actions;

export default coverSlice.reducer;
