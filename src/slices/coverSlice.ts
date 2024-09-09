import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoverState {
  selectedCover: string[]; // 선택된 커버 상태
  selectedCoverImage: string | null; // 업로드된 이미지 상태
  colorPalettes: string[][];
  randomPalettes: { palette: string[]; index: number }[];
  coverType: 'gradient' | 'solid' | 'image';
  selectedPalette: string[]; // 선택된 팔레트 상태 추가
  coverColors: string[]; // 선택된 커버 색상 추가
}

const initialState: CoverState = {
  selectedCover: [], // 초기값은 빈 배열
  selectedCoverImage: null, // 초기값은 null
  colorPalettes: [],
  randomPalettes: [],
  coverType: 'gradient',
  selectedPalette: [], // 초기값 추가
  coverColors: [], // 초기값 추가
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
      state.selectedPalette = action.payload; // 선택된 팔레트 업데이트
    },
    setCoverColors: (state, action: PayloadAction<string[]>) => {
      state.coverColors = action.payload; // 선택된 커버 색상 업데이트
    },
  },
});

export const {
  setSelectedCover,
  setSelectedCoverImage,
  setColorPalettes,
  setRandomPalettes,
  setCoverType,
  setSelectedPalette, // 추가
  setCoverColors, // 추가
} = coverSlice.actions;

export default coverSlice.reducer;
