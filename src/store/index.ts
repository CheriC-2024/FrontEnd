import { configureStore } from '@reduxjs/toolkit';
import {
  aiRecommendReducer,
  artworkReducer,
  collectionReducer,
  coverReducer,
  exhibitReducer,
  themeReducer,
} from '../slices/_index';

const store = configureStore({
  reducer: {
    aiRecommend: aiRecommendReducer,
    artwork: artworkReducer,
    collection: collectionReducer,
    cover: coverReducer,
    exhibit: exhibitReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
