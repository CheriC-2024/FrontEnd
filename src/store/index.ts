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
  commentReducer,
  registerPrivateArtworkReducer,
  registerArtistReducer,
  getUserReducer,
  watchingExhibitReducer,
} from '../slices/_index';

const store = configureStore({
  reducer: {
    aiRecommend: aiRecommendReducer,
    artwork: artworkReducer,
    auth: authReducer,
    collection: collectionReducer,
    comment: commentReducer,
    cover: coverReducer,
    follow: followReducer,
    getUser: getUserReducer,
    exhibit: exhibitReducer,
    profile: profileReducer,
    registerArtist: registerArtistReducer,
    registerPrivateArtwork: registerPrivateArtworkReducer,
    theme: themeReducer,
    user: userReducer,
    watchingExhibit: watchingExhibitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
