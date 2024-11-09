import { configureStore } from '@reduxjs/toolkit';
import {
  aiRecommendReducer,
  artworkReducer,
  collectionReducer,
  coverReducer,
  exhibitReducer,
  profileReducer,
  themeReducer,
  userReducer,
} from '../slices/_index';

const store = configureStore({
  reducer: {
    aiRecommend: aiRecommendReducer,
    artwork: artworkReducer,
    collection: collectionReducer,
    cover: coverReducer,
    exhibit: exhibitReducer,
    profile: profileReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
