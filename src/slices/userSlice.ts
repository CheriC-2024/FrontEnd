import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  nickname: string;
  bio: string;
  interests: string[];
  collectingExperience: boolean | null;
  isArtist: boolean | null;
}

const initialState: UserState = {
  nickname: '',
  bio: '',
  interests: [],
  collectingExperience: null,
  isArtist: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    setCollectingExperience: (state, action: PayloadAction<boolean | null>) => {
      state.collectingExperience = action.payload;
    },
    setIsArtist: (state, action: PayloadAction<boolean | null>) => {
      state.isArtist = action.payload;
    },
  },
});

export const {
  setNickname,
  setBio,
  setInterests,
  setCollectingExperience,
  setIsArtist,
} = userSlice.actions;
export default userSlice.reducer;
