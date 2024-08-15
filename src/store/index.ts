import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from '../slices/collectionSlice';
import artworkReducer from '../slices/artworkSlice';

const store = configureStore({
  reducer: {
    collection: collectionReducer,
    artwork: artworkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
