import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExhibitState {
  exhibitTitle: string;
  exhibitDescription: string;
  selectedFont: string;
  fontData: { label: string; value: string; fontFamily: string }[];
  colorPalettes: string[][];
  selectedPalette: string[];
  coverColors: string[];
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
        colorPalettes: action.payload, // 새로운 객체 반환
      };
    },
    setSelectedPalette: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        selectedPalette: action.payload, // 새로운 객체 반환
      };
    },
    setCoverColors: (state, action: PayloadAction<string[]>) => {
      state.coverColors = action.payload;
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
} = exhibitSlice.actions;

export default exhibitSlice.reducer;
