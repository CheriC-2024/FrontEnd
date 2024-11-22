import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  nickname: string;
  bio: string;
  interests: string[];
  collectingExperience: boolean | null;
  isArtist: boolean | null;
  profileImage: string;
}

const initialState: UserState = {
  nickname: '',
  bio: '',
  interests: [],
  collectingExperience: null,
  isArtist: null,
  profileImage: '',
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
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

// 디폴트 이미지를 반환하는 Selector 추가
export const selectProfileImage = (state: { user: UserState }) =>
  state.user.profileImage || 'https://i.ibb.co/k2KZPvp/Group-4625.png';

export const {
  setNickname,
  setBio,
  setInterests,
  setCollectingExperience,
  setIsArtist,
  setProfileImage,
} = userSlice.actions;

export default userSlice.reducer;
