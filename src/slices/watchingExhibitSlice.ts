import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArtExhibitionRes {
  imgUrl: string;
  cherryPrice: number | null;
  name: string;
  artistName: string;
  series: string | null;
  horizontalSize: number;
  verticalSize: number;
  material: string | null;
  madeAt: string;
  artTypes: string[];
  ownArtRes: {
    price: number | null;
  };
  heartCount: number;
  collectorsArt: boolean;
}

interface ExhibitionArtRes {
  description: string;
  reasonForPurchase: string;
  review: string;
  artExhibitionRes: ArtExhibitionRes;
}

interface UserRes {
  id: number;
  name: string;
  description: string;
  artTypes: string[];
  profileImgUrl: string;
}

interface ExhibitionDetails {
  title: string;
  description: string;
  heartCount: number;
  hits: number;
  exhibitionArtRess: ExhibitionArtRes[];
  userRes: UserRes;
  exhibitionReviewRes: any; // Define specific type if applicable
}

interface WatchingExhibitState {
  details: ExhibitionDetails | null; // Use the defined interface
  font: string | null;
}

const initialState: WatchingExhibitState = {
  details: null,
  font: null,
};

const watchingExhibitSlice = createSlice({
  name: 'watchingExhibit',
  initialState,
  reducers: {
    setExhibitDetails: (state, action: PayloadAction<ExhibitionDetails>) => {
      state.details = {
        ...action.payload,
        title: state.details?.title || action.payload.title, // 기존 title 유지
      };
    },
    setExhibitTitle: (state, action: PayloadAction<string>) => {
      if (state.details) {
        state.details.title = action.payload;
      }
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    clearExhibitDetails: (state) => {
      state.details = null;
    },
  },
});

export const {
  setExhibitDetails,
  setExhibitTitle,
  setFont,
  clearExhibitDetails,
} = watchingExhibitSlice.actions;
export default watchingExhibitSlice.reducer;
