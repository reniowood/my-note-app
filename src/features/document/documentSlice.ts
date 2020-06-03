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
      const parentId = blocks.byId[id].parent;
      let newParent = {};
      if (parentId !== null) {
        const parent = blocks.byId[parentId];
        const index = parent.children.indexOf(id);

        newParent = {
          [parentId]: {
            ...parent,
            children: [
              ...parent.children.slice(0, index + 1),
              newId,
              ...parent.children.slice(index + 1),
            ],
          },
        };
      }

      const indexInAll = blocks.all.indexOf(id);

      return {
        ...state,
        blocks: {
          byId: {
            ...blocks.byId,
            ...newParent,
            [newId]: {
              id: newId,
              parent: parentId,
              children: [],
              content,
            },
          },
          all: [
            ...blocks.all.slice(0, indexInAll + 1),
            newId,
            ...blocks.all.slice(indexInAll + 1),
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
    indent: (state: DocumentState, action: PayloadAction<string>) => {
      const { blocks } = state;
      const id = action.payload;

      const block = blocks.byId[id];
      if (block.parent === null) {
        if (blocks.all[0] === id) {
          return state;
        }

        const blocksWithoutParent = blocks.all
          .filter((blockId) => blocks.byId[blockId].parent === null);
        const previousSiblingId = blocksWithoutParent[blocksWithoutParent.indexOf(id) - 1];

        return {
          ...state,
          blocks: {
            ...blocks,
            byId: {
              ...blocks.byId,
              [id]: {
                ...block,
                parent: previousSiblingId,
              },
              [previousSiblingId]: {
                ...blocks.byId[previousSiblingId],
                children: [
                  ...blocks.byId[previousSiblingId].children,
                  id,
                ],
              },
            },
          },
        };
      }

      const parent = blocks.byId[block.parent];
      const index = parent.children.indexOf(id);
      if (index === 0) {
        return state;
      }

      const previousSiblingId = parent.children[index - 1];

      return {
        ...state,
        blocks: {
          ...blocks,
          byId: {
            ...blocks.byId,
            [id]: {
              ...block,
              parent: previousSiblingId,
            },
            [parent.id]: {
              ...parent,
              children: [
                ...parent.children.slice(0, index),
                ...parent.children.slice(index + 1),
              ],
            },
            [previousSiblingId]: {
              ...blocks.byId[previousSiblingId],
              children: [
                ...blocks.byId[previousSiblingId].children,
                id,
              ],
            },
          },
        },
      };
    },
    outdent: (state: DocumentState, action: PayloadAction<string>) => {
      const { blocks } = state;
      const id = action.payload;

      const block = blocks.byId[id];
      if (block.parent === null) {
        return state;
      }

      const parent = blocks.byId[block.parent];
      const index = parent.children.indexOf(id);
      if (parent.parent === null) {
        return {
          ...state,
          blocks: {
            ...blocks,
            byId: {
              ...blocks.byId,
              [id]: {
                ...block,
                parent: null,
              },
              [parent.id]: {
                ...parent,
                children: [
                  ...parent.children.slice(0, index),
                  ...parent.children.slice(index + 1),
                ],
              },
            },
          },
        };
      }

      const grandParent = blocks.byId[parent.parent];
      const parentIndex = grandParent.children.indexOf(parent.id);

      const indexInAll = blocks.all.indexOf(id);
      const lastSiblingIndexInAll = blocks.all.indexOf(parent.children[parent.children.length - 1]);

      return {
        ...state,
        blocks: {
          ...blocks,
          byId: {
            ...blocks.byId,
            [id]: {
              ...block,
              parent: grandParent.id,
            },
            [parent.id]: {
              ...parent,
              children: [
                ...parent.children.slice(0, index),
                ...parent.children.slice(index + 1),
              ],
            },
            [grandParent.id]: {
              ...grandParent,
              children: [
                ...grandParent.children.slice(0, parentIndex),
                parent.id,
                id,
                ...grandParent.children.slice(parentIndex + 1),
              ],
            },
          },
          all: [
            ...blocks.all.slice(0, indexInAll),
            ...blocks.all.slice(indexInAll + 1, lastSiblingIndexInAll + 1),
            id,
            ...blocks.all.slice(lastSiblingIndexInAll + 1),
          ],
        },
        cursor: {
          ...state.cursor,
          row: lastSiblingIndexInAll,
        },
      };
    },
  },
});

export const {
  addBlockNextTo, updateBlock, moveCursorUp, moveCursorDown, setCursorRow, indent, outdent,
} = documentSlice.actions;

export default documentSlice.reducer;
