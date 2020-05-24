import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

export interface DocumentState {
  readonly lines: LineState[];
  readonly cursor: CursorState;
}

export interface LineState {
  readonly id: string;
  readonly content: string;
}

interface CursorState {
  readonly row: number;
  readonly column: number;
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
  lines: [{
    id: uuid(),
    content: '',
  }],
  cursor: {
    row: 0,
    column: 0,
  },
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addLine: (state: DocumentState, action: PayloadAction<AddLineActionPayload>) => {
      const { lines, cursor } = state;
      const { index, content } = action.payload;

      return {
        lines: [
          ...lines.slice(0, index + 1),
          {
            id: uuid(),
            content,
          },
          ...lines.slice(index + 1),
        ],
        cursor: {
          row: cursor.row + 1,
          column: 0,
        },
      };
    },
    updateLine: (state: DocumentState, action: PayloadAction<UpdateLineActionPayload>) => {
      const { lines } = state;
      const { index, content } = action.payload;

      return {
        ...state,
        lines: [
          ...lines.slice(0, index),
          {
            ...lines[index],
            content,
          },
          ...lines.slice(index + 1),
        ],
      };
    },
    mergeLine: (state: DocumentState, action: PayloadAction<MergeLineActionPayload>) => {
      const { lines } = state;
      const { from, to } = action.payload;

      if (from < to) {
        return {
          lines: [
            ...lines.slice(0, from),
            ...lines.slice(from + 1, to),
            {
              ...lines[to],
              content: lines[to].content + lines[from].content,
            },
            ...lines.slice(to + 1),
          ],
          cursor: {
            row: to - 1,
            column: lines[to].content.length,
          },
        };
      }

      if (from > to) {
        return {
          lines: [
            ...lines.slice(0, to),
            {
              ...lines[to],
              content: lines[to].content + lines[from].content,
            },
            ...lines.slice(to + 1, from),
            ...lines.slice(from + 1),
          ],
          cursor: {
            row: to,
            column: lines[to].content.length,
          },
        };
      }

      return state;
    },
    moveCursorUp: (state: DocumentState) => {
      const { cursor } = state;

      return {
        ...state,
        cursor: {
          ...cursor,
          row: Math.max(0, cursor.row - 1),
        },
      };
    },
    moveCursorDown: (state: DocumentState) => {
      const { cursor, lines } = state;

      return {
        ...state,
        cursor: {
          ...cursor,
          row: Math.min(lines.length - 1, cursor.row + 1),
        },
      };
    },
  },
});

export const {
  addLine, updateLine, mergeLine, moveCursorUp, moveCursorDown,
} = documentSlice.actions;

export default documentSlice.reducer;
