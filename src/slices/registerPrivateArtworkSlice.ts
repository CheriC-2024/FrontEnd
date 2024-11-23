import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArtBasicInfo {
  name: string;
  description: string;
  series: string;
  material: string;
  madeAt: number;
  cherryPrice: number;
  horizontalSize: number;
  verticalSize: number;
  imgUrl: string;
  artTypes: string[];
}

interface RegisterPrivateArtworkState {
  artBasicInfo: ArtBasicInfo;
  artistName: string;
  price: number;
  isPriceOpen: boolean;
  fileUrl: string[];
  imgUrls: string[];
}

const initialState: RegisterPrivateArtworkState = {
  artBasicInfo: {
    name: '',
    description: '',
    series: '',
    material: '',
    madeAt: 0,
    cherryPrice: 0,
    horizontalSize: 0,
    verticalSize: 0,
    imgUrl: '',
    artTypes: [],
  },
  artistName: '',
  price: 0,
  isPriceOpen: false,
  fileUrl: [],
  imgUrls: [],
};

const registerPrivateArtworkSlice = createSlice({
  name: 'registerPrivateArtwork',
  initialState,
  reducers: {
    updateArtBasicInfo(state, action: PayloadAction<Partial<ArtBasicInfo>>) {
      state.artBasicInfo = {
        ...state.artBasicInfo,
        ...action.payload,
      };
    },
    setArtistName(state, action: PayloadAction<string>) {
      state.artistName = action.payload;
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    setIsPriceOpen(state, action: PayloadAction<boolean>) {
      state.isPriceOpen = action.payload;
    },
    setFileUrl(state, action: PayloadAction<string[]>) {
      state.fileUrl = action.payload;
    },
    setImgUrls(state, action: PayloadAction<string[]>) {
      state.imgUrls = action.payload;
    },
    resetArtwork(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  updateArtBasicInfo,
  setArtistName,
  setPrice,
  setIsPriceOpen,
  setFileUrl,
  setImgUrls,
  resetArtwork,
} = registerPrivateArtworkSlice.actions;

export default registerPrivateArtworkSlice.reducer;
