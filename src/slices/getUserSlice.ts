import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string | null;
  description: string | null;
  artTypes: string[];
  profileImgUrl: string | null;
  backgroundImgUrl: string | null;
  followerAmount: number;
  followingAmount: number;
  myCherryNum: number;
  soldCherryNum: number | null;
  validateArtist: boolean;
}

const initialState: UserState = {
  id: 0,
  name: null,
  description: null,
  artTypes: [],
  profileImgUrl: null,
  backgroundImgUrl: null,
  followerAmount: 0,
  followingAmount: 0,
  myCherryNum: 0,
  soldCherryNum: null,
  validateArtist: false,
};

// 영어 -> 한글 매핑
const artTypeMapping: Record<string, string> = {
  WATER_PAINTING: '수채화',
  OIL_PAINTING: '유화',
  NEW_MEDIA_ART: '뉴미디어',
  ORIENTAL_PAINTING: '동양화',
  DRAWING_ART: '드로잉',
  DESIGN_ART: '디자인',
  PRINTMAKING_PAINTING: '판화',
  PAINTING: '회화',
};

const getUserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      const data = action.payload;

      // 영어 -> 한글 매핑 적용
      state.artTypes = data.artTypes.map(
        (type) => artTypeMapping[type] || type,
      );

      // 나머지 필드 설정
      state.id = data.id;
      state.name = data.name;
      state.description = data.description;
      state.profileImgUrl = data.profileImgUrl;
      state.backgroundImgUrl = data.backgroundImgUrl;
      state.followerAmount = data.followerAmount;
      state.followingAmount = data.followingAmount;
      state.myCherryNum = data.myCherryNum;
      state.soldCherryNum = data.soldCherryNum;
      state.validateArtist = data.validateArtist;
    },
    clearUserData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserData, clearUserData } = getUserSlice.actions;
export default getUserSlice.reducer;
