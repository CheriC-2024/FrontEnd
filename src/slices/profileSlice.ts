import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  artistId: number | null;
}

const initialState: ProfileState = {
  artistId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setArtistId(state, action: PayloadAction<number | null>) {
      state.artistId = action.payload;
    },
  },
});

export const { setArtistId } = profileSlice.actions;
export default profileSlice.reducer;
