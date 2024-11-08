import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  nickname: string;
  bio: string;
  interests: string[];
}

const initialState: UserState = {
  nickname: '',
  bio: '',
  interests: [],
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
  },
});

export const { setNickname, setBio, setInterests } = userSlice.actions;
export default userSlice.reducer;
