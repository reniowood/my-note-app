import { configureStore } from '@reduxjs/toolkit';
import documentReducer from '../features/document/documentSlice';

export const store = configureStore({
  reducer: documentReducer,
});

export type RootState = ReturnType<typeof store.getState>;
