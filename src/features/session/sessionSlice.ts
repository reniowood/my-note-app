import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  readonly cursor: number;
  readonly length: number;
}

const initialState: SessionState = {
  cursor: 0,
  length: 0,
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
        cursor: Math.min(length, cursor + 1),
      };
    },
    setLength: (state: SessionState, action: PayloadAction<number>) => ({
      ...state,
      length: action.payload,
    }),
  },
});

export const { moveCursorUp, moveCursorDown, setLength } = sessionState.actions;

export const selectCursor = (state: { session: SessionState }) => state.session.cursor;
export const selectLength = (state: { session: SessionState }) => state.session.length;

export default sessionState.reducer;
