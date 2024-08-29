import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExhibitState {
  exhibitTitle: string;
  exhibitDescription: string;
  selectedFont: string;
  fontData: { label: string; value: string; fontFamily: string }[];
  colorPalettes: string[][];
  selectedPalette: string[];
  coverColors: string[];
  randomPalettes: { palette: string[]; index: number }[];
  coverType: 'gradient' | 'solid' | 'image';
  selectedCoverImage: string | null;
  selectedPattern: 'linear' | 'radial' | 'angular' | 'diamond';
}

const initialState: ExhibitState = {
  exhibitTitle: '',
  exhibitDescription: '',
  selectedFont: '',
  fontData: [
    {
      label: '기본 시스템 폰트',
      value: 'default',
      fontFamily: 'PretendardRegular',
    },
    { label: '검은고딕', value: 'BlackHanSans', fontFamily: 'BlackHanSans' },
    { label: '마포다카포', value: 'Mapo', fontFamily: 'Mapo' },
    { label: '산토끼', value: 'SanTokki', fontFamily: 'SanTokki' },
    { label: '롯데리아 찹땅겨', value: 'Lotteria', fontFamily: 'Lotteria' },
  ],
  colorPalettes: [],
  selectedPalette: [],
  coverColors: [],
  randomPalettes: [],
  coverType: 'gradient',
  selectedCoverImage: null, // 초기값 설정
  selectedPattern: 'linear', // 초기값 설정
};

const exhibitSlice = createSlice({
  name: 'exhibit',
  initialState,
  reducers: {
    setExhibitTitle: (state, action: PayloadAction<string>) => {
      state.exhibitTitle = action.payload;
    },
    setExhibitDescription: (state, action: PayloadAction<string>) => {
      state.exhibitDescription = action.payload;
    },
    setSelectedFont: (state, action: PayloadAction<string>) => {
      state.selectedFont = action.payload;
    },
    setFontData: (
      state,
      action: PayloadAction<
        { label: string; value: string; fontFamily: string }[]
      >,
    ) => {
      state.fontData = action.payload;
    },
    setColorPalettes: (state, action: PayloadAction<string[][]>) => {
      return {
        ...state,
        colorPalettes: action.payload,
      };
    },
    setSelectedPalette: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        selectedPalette: action.payload,
      };
    },
    setCoverColors: (state, action: PayloadAction<string[]>) => {
      state.coverColors = action.payload;
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
    setSelectedCoverImage: (state, action: PayloadAction<string | null>) => {
      state.selectedCoverImage = action.payload;
    },
    setSelectedPattern: (
      state,
      action: PayloadAction<'linear' | 'radial' | 'angular' | 'diamond'>,
    ) => {
      state.selectedPattern = action.payload;
    },
  },
});

export const {
  setExhibitTitle,
  setExhibitDescription,
  setSelectedFont,
  setFontData,
  setColorPalettes,
  setSelectedPalette,
  setCoverColors,
  setRandomPalettes,
  setCoverType,
  setSelectedCoverImage,
  setSelectedPattern,
} = exhibitSlice.actions;

export default exhibitSlice.reducer;
