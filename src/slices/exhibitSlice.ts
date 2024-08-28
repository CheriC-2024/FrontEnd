import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExhibitState {
  exhibitTitle: string;
  exhibitDescription: string;
  selectedFont: string;
  fontData: { label: string; value: string; fontFamily: string }[];
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
  },
});

export const {
  setExhibitTitle,
  setExhibitDescription,
  setSelectedFont,
  setFontData,
} = exhibitSlice.actions;

export default exhibitSlice.reducer;
