import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  artistId: number | null;
  followers: number;
}

const initialState: ProfileState = {
  artistId: null,
  followers: 0,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setArtistId(state, action: PayloadAction<number | null>) {
      state.artistId = action.payload;
    },
    setInitialFollowers(state, action: PayloadAction<number>) {
      state.followers = action.payload;
    },
    toggleFollow(state) {
      state.followers += 1;
    },
    unFollow(state) {
      state.followers -= 1;
    },
  },
});

export const { setArtistId, setInitialFollowers, toggleFollow, unFollow } =
  profileSlice.actions;
export default profileSlice.reducer;
