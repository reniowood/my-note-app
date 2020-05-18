import { configureStore } from '@reduxjs/toolkit';
import documentReducer from '../features/document/documentSlice';
import sessionReducer from '../features/session/sessionSlice';

export default configureStore({
  reducer: {
    document: documentReducer,
    session: sessionReducer,
  },
});
