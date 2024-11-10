import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowState {
  currentProfileId: number | null; // 현재 프로필 ID
  followers: Record<number, number>; // 각 프로필 ID별 팔로워 수
  isFollowing: Record<number, boolean>; // 각 프로필 ID별 팔로우 상태
}

const initialState: FollowState = {
  currentProfileId: null,
  followers: {},
  isFollowing: {},
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    setCurrentProfileId: (state, action: PayloadAction<number>) => {
      state.currentProfileId = action.payload;
    },
    setInitialFollowers: (
      state,
      action: PayloadAction<{ userId: number; followers: number }>,
    ) => {
      const { userId, followers } = action.payload;
      state.followers[userId] = followers;
    },
    toggleFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const isFollowing = state.isFollowing[userId] || false;
      state.isFollowing[userId] = !isFollowing;
      state.followers[userId] =
        (state.followers[userId] || 0) + (isFollowing ? -1 : 1);
    },
    unFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      if (state.isFollowing[userId]) {
        state.isFollowing[userId] = false;
        state.followers[userId] = Math.max(
          (state.followers[userId] || 0) - 1,
          0,
        );
      }
    },
  },
});

export const {
  setCurrentProfileId,
  setInitialFollowers,
  toggleFollow,
  unFollow,
} = followSlice.actions;
export default followSlice.reducer;
