import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArtistBasicReq {
  name: string;
  info: string;
  profileImgUrl: string;
  userPartRequests: string[];
}

interface ArtistContactReq {
  instagram?: string;
  twitter?: string;
  naverBlog?: string;
  email?: string;
}

interface ArtistDegreeReq {
  schoolName: string;
  major: string;
  entranceAt: number;
  graduateAt: number;
}

interface ArtistExhibitionReq {
  exhibitionName: string;
  location: string;
  byWho: string;
  exhibitionType: string;
  openedAt: number;
}

interface ArtistArtStorageReq {
  location: string;
}

interface ArtistPrizeReq {
  organization: string;
  level: string;
  receivedAt: number;
}

interface ArtistResidenceReq {
  residenceName: string;
}

interface RegisterArtistState {
  artistBasicReq: ArtistBasicReq;
  fileUrl: string[];
  artistContactReq: ArtistContactReq;
  artistDegreeReqs: ArtistDegreeReq[];
  artistExhibitionReqs: ArtistExhibitionReq[];
  artistArtStorageReqs: ArtistArtStorageReq[];
  artistPrizeReqs: ArtistPrizeReq[];
  artistResidenceReqs: ArtistResidenceReq[];
}

const initialState: RegisterArtistState = {
  artistBasicReq: {
    name: '',
    info: '',
    profileImgUrl: '',
    userPartRequests: [],
  },
  fileUrl: [],
  artistContactReq: {
    instagram: '',
    twitter: '',
    naverBlog: '',
    email: '',
  },
  artistDegreeReqs: [],
  artistExhibitionReqs: [],
  artistArtStorageReqs: [],
  artistPrizeReqs: [],
  artistResidenceReqs: [],
};

const registerArtistSlice = createSlice({
  name: 'registerArtist',
  initialState,
  reducers: {
    updateArtistBasicReq(
      state,
      action: PayloadAction<Partial<ArtistBasicReq>>,
    ) {
      state.artistBasicReq = {
        ...state.artistBasicReq,
        ...action.payload,
      };
    },
    setFileUrl(state, action: PayloadAction<string[]>) {
      state.fileUrl = action.payload;
    },
    updateArtistContactReq(
      state,
      action: PayloadAction<Partial<ArtistContactReq>>,
    ) {
      state.artistContactReq = {
        ...state.artistContactReq,
        ...action.payload,
      };
    },
    addArtistDegreeReq(state, action: PayloadAction<ArtistDegreeReq>) {
      state.artistDegreeReqs.push(action.payload);
    },
    removeArtistDegreeReq(state, action: PayloadAction<number>) {
      state.artistDegreeReqs.splice(action.payload, 1);
    },
    updateArtistDegreeReq(
      state,
      action: PayloadAction<{ index: number; updated: ArtistDegreeReq }>,
    ) {
      state.artistDegreeReqs[action.payload.index] = action.payload.updated;
    },

    addArtistExhibitionReq(state, action: PayloadAction<ArtistExhibitionReq>) {
      state.artistExhibitionReqs.push(action.payload);
    },
    addArtistArtStorageReq(state, action: PayloadAction<ArtistArtStorageReq>) {
      state.artistArtStorageReqs.push(action.payload);
    },
    addArtistPrizeReq(state, action: PayloadAction<ArtistPrizeReq>) {
      state.artistPrizeReqs.push(action.payload);
    },
    addArtistResidenceReq(state, action: PayloadAction<ArtistResidenceReq>) {
      state.artistResidenceReqs.push(action.payload);
    },
    resetRegisterArtistState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  updateArtistBasicReq,
  setFileUrl,
  updateArtistContactReq,
  addArtistDegreeReq,
  removeArtistDegreeReq,
  updateArtistDegreeReq,
  addArtistExhibitionReq,
  addArtistArtStorageReq,
  addArtistPrizeReq,
  addArtistResidenceReq,
  resetRegisterArtistState,
} = registerArtistSlice.actions;

export default registerArtistSlice.reducer;
