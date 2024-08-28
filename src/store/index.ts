import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from '../slices/collectionSlice';
import artworkReducer from '../slices/artworkSlice';
import themeReducer from '../slices/themeSlice';
import aiRecommendReducer from '../slices/aiRecommendSlice';
import exhibitReducer from '../slices/exhibitSlice';

const store = configureStore({
  reducer: {
    collection: collectionReducer,
    artwork: artworkReducer,
    theme: themeReducer,
    aiRecommend: aiRecommendReducer,
    exhibit: exhibitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
