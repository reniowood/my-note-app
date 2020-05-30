import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

type BlockId = string;

export interface DocumentState {
  readonly blocks: { byId: { [id: string]: BlockState }, all: BlockId[] };
  readonly cursor: CursorState;
}

export type BlockState = TextBlockState;

export interface BaseBlockState {
  readonly id: BlockId;
  readonly parent: BlockId | null;
  readonly children: BlockId[];
}

export interface TextBlockState extends BaseBlockState {
  readonly content: string;
}

export interface CursorState {
  readonly row: number;
  readonly column: number;
}

export interface AddBlockNextToActionPayload {
  readonly id: BlockId;
  readonly content: string;
}

export interface UpdateBlockActionPayload {
  readonly id: string;
  readonly content: string;
}

function createInitialState() {
  const initialBlock: BlockState = {
    id: uuid(),
    parent: null,
    children: [],
    content: '',
  };

  return {
    blocks: {
      byId: {
        [initialBlock.id]: initialBlock,
      },
      all: [initialBlock.id],
    },
    cursor: {
      row: 0,
      column: 0,
    },
  };
}

const documentSlice = createSlice({
  name: 'document',
  initialState: createInitialState(),
  reducers: {
    addBlockNextTo: (state: DocumentState, action: PayloadAction<AddBlockNextToActionPayload>) => {
      const { blocks } = state;
      const { id, content } = action.payload;

      const newId = uuid();
      const index = blocks.all.findIndex((blockId) => blockId === id);
      const parentId = blocks.byId[id].parent;
      const updatedParent = (parentId && {
        [parentId]: {
          ...blocks.byId[parentId],
          children: [
            ...blocks.byId[parentId].children,
            newId,
          ],
        },
      }) || {};

      return {
        ...state,
        blocks: {
          byId: Object.assign(updatedParent, {
            ...blocks.byId,
            [newId]: {
              id: newId,
              parent: parentId,
              children: [],
              content,
            },
          }),
          all: [
            ...blocks.all.slice(0, index + 1),
            newId,
            ...blocks.all.slice(index + 1),
          ],
        },
      };
    },
    updateBlock: (state: DocumentState, action: PayloadAction<UpdateBlockActionPayload>) => {
      const { blocks } = state;
      const { id, content } = action.payload;

      return {
        ...state,
        blocks: {
          ...blocks,
          byId: {
            ...blocks.byId,
            [id]: {
              ...blocks.byId[id],
              content,
            },
          },
        },
      };
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
      const numBlocks = blocks.all.length;

      return {
        ...state,
        cursor: {
          ...cursor,
          row: Math.min(numBlocks - 1, cursor.row + 1),
        },
      };
    },
    setCursorRow: (state: DocumentState, action: PayloadAction<number>) => {
      const { cursor, blocks } = state;
      const row = action.payload;
      const numBlocks = blocks.all.length;

      if (row < 0 || row >= numBlocks) {
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
  addBlockNextTo, updateBlock, moveCursorUp, moveCursorDown, setCursorRow,
} = documentSlice.actions;

export default documentSlice.reducer;
