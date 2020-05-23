import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionState {
  readonly cursor: number;
  readonly length: number;
}

const initialState: SessionState = {
  cursor: 0,
  length: 1,
};

export const sessionState = createSlice({
  name: 'session',
  initialState,
  reducers: {
    moveCursorUp: (state: SessionState) => {
      const { cursor } = state;

      return {
        ...state,
        cursor: Math.max(0, cursor - 1),
      };
    },
    moveCursorDown: (state: SessionState) => {
      const { cursor, length } = state;

      return {
        ...state,
        cursor: Math.min(length - 1, cursor + 1),
      };
    },
    setLength: (state: SessionState, action: PayloadAction<number>) => ({
      ...state,
      length: action.payload,
    }),
  },
});

export const { moveCursorUp, moveCursorDown, setLength } = sessionState.actions;

export default sessionState.reducer;
