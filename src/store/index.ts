import { configureStore } from '@reduxjs/toolkit';
import {
  aiRecommendReducer,
  artworkReducer,
  authReducer,
  collectionReducer,
  coverReducer,
  followReducer,
  exhibitReducer,
  profileReducer,
  themeReducer,
  userReducer,
} from '../slices/_index';

const store = configureStore({
  reducer: {
    aiRecommend: aiRecommendReducer,
    artwork: artworkReducer,
    auth: authReducer,
    collection: collectionReducer,
    cover: coverReducer,
    follow: followReducer,
    exhibit: exhibitReducer,
    profile: profileReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
