import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

export interface DocumentState {
  readonly blocks: BlockState[];
  readonly cursor: CursorState;
}

export type BlockState = TextBlockState;

export interface BaseBlockState {
  readonly id: string;
}

export interface TextBlockState extends BaseBlockState {
  readonly content: string;
}

export interface CursorState {
  readonly row: number;
  readonly column: number;
}

export interface AddBlockActionPayload {
  readonly index: number;
  readonly content: string;
}

export interface UpdateBlockActionPayload {
  readonly index: number;
  readonly content: string;
}

export interface MergeBlockActionPayload {
  readonly from: number;
  readonly to: number;
}

const initialState: DocumentState = {
  blocks: [{
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
    addBlock: (state: DocumentState, action: PayloadAction<AddBlockActionPayload>) => {
      const { blocks, cursor } = state;
      const { index, content } = action.payload;

      return {
        blocks: [
          ...blocks.slice(0, index + 1),
          {
            id: uuid(),
            content,
          },
          ...blocks.slice(index + 1),
        ],
        cursor: {
          row: cursor.row + 1,
          column: 0,
        },
      };
    },
    updateBlock: (state: DocumentState, action: PayloadAction<UpdateBlockActionPayload>) => {
      const { blocks } = state;
      const { index, content } = action.payload;

      return {
        ...state,
        blocks: [
          ...blocks.slice(0, index),
          {
            ...blocks[index],
            content,
          },
          ...blocks.slice(index + 1),
        ],
      };
    },
    mergeBlock: (state: DocumentState, action: PayloadAction<MergeBlockActionPayload>) => {
      const { blocks } = state;
      const { from, to } = action.payload;

      if (from < to) {
        return {
          blocks: [
            ...blocks.slice(0, from),
            ...blocks.slice(from + 1, to),
            {
              ...blocks[to],
              content: blocks[to].content + blocks[from].content,
            },
            ...blocks.slice(to + 1),
          ],
          cursor: {
            row: to - 1,
            column: blocks[to].content.length,
          },
        };
      }

      if (from > to) {
        return {
          blocks: [
            ...blocks.slice(0, to),
            {
              ...blocks[to],
              content: blocks[to].content + blocks[from].content,
            },
            ...blocks.slice(to + 1, from),
            ...blocks.slice(from + 1),
          ],
          cursor: {
            row: to,
            column: blocks[to].content.length,
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
      const { cursor, blocks } = state;

      return {
        ...state,
        cursor: {
          ...cursor,
          row: Math.min(blocks.length - 1, cursor.row + 1),
        },
      };
    },
    setCursorRow: (state: DocumentState, action: PayloadAction<number>) => {
      const { cursor, blocks } = state;
      const row = action.payload;

      if (row < 0 || row >= blocks.length) {
        return state;
      }

      return {
        ...state,
        cursor: {
          ...cursor,
          row,
        },
      };
    },
  },
});

export const {
  addBlock, updateBlock, mergeBlock, moveCursorUp, moveCursorDown, setCursorRow,
} = documentSlice.actions;

export default documentSlice.reducer;
