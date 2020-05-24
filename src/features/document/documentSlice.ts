import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DocumentState {
  readonly lines: string[];
  readonly cursor: number;
}

export interface AddLineActionPayload {
  readonly index: number;
  readonly content: string;
}

export interface UpdateLineActionPayload {
  readonly index: number;
  readonly content: string;
}

export interface MergeLineActionPayload {
  readonly from: number;
  readonly to: number;
}

const initialState: DocumentState = {
  lines: ['test'],
  cursor: 0,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addLine: (state: DocumentState, action: PayloadAction<AddLineActionPayload>) => {
      const { lines } = state;
      const { index, content } = action.payload;

      return {
        ...state,
        lines: [
          ...lines.slice(0, index + 1),
          content,
          ...lines.slice(index + 1),
        ],
      };
    },
    updateLine: (state: DocumentState, action: PayloadAction<UpdateLineActionPayload>) => {
      const { lines } = state;
      const { index, content } = action.payload;

      return {
        ...state,
        lines: [
          ...lines.slice(0, index),
          content,
          ...lines.slice(index + 1),
        ],
      };
    },
    mergeLine: (state: DocumentState, action: PayloadAction<MergeLineActionPayload>) => {
      const { lines } = state;
      const { from, to } = action.payload;

      if (from < to) {
        return {
          ...state,
          lines: [
            ...lines.slice(0, from),
            ...lines.slice(from + 1, to),
            lines[to] + lines[from],
            ...lines.slice(to + 1),
          ],
        };
      }

      if (from > to) {
        return {
          ...state,
          lines: [
            ...lines.slice(0, to),
            lines[to] + lines[from],
            ...lines.slice(to + 1, from),
            ...lines.slice(from + 1),
          ],
        };
      }

      return state;
    },
    moveCursorUp: (state: DocumentState) => {
      const { cursor } = state;

      return {
        ...state,
        cursor: Math.max(0, cursor - 1),
      };
    },
    moveCursorDown: (state: DocumentState) => {
      const { cursor, lines } = state;

      return {
        ...state,
        cursor: Math.min(lines.length - 1, cursor + 1),
      };
    },
  },
});

export const {
  addLine, updateLine, mergeLine, moveCursorUp, moveCursorDown
} = documentSlice.actions;

export default documentSlice.reducer;
