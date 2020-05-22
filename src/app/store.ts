import { configureStore } from '@reduxjs/toolkit';
import documentReducer from '../features/document/documentSlice';
import sessionReducer from '../features/session/sessionSlice';

export const store = configureStore({
  reducer: {
    document: documentReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
