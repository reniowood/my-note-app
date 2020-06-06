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
      const { cursor, blocks } = state;
      if (cursor.row === 0) {
        return state;
      }

      const prevBlockId = blocks.all[cursor.row - 1];
      const prevBlock = blocks.byId[prevBlockId];

      return {
        ...state,
        cursor: {
          row: cursor.row - 1,
          column: Math.min(cursor.column, prevBlock.content.length),
        },
      };
    },
    moveCursorDown: (state: DocumentState) => {
      const { cursor, blocks } = state;
      const numBlocks = blocks.all.length;
      if (cursor.row === numBlocks - 1) {
        return state;
      }

      const nextBlockId = blocks.all[cursor.row + 1];
      const nextBlock = blocks.byId[nextBlockId];

      return {
        ...state,
        cursor: {
          row: cursor.row + 1,
          column: Math.min(cursor.column, nextBlock.content.length),
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
    setCursorColumn: (state: DocumentState, action: PayloadAction<number>) => {
      const { cursor, blocks } = state;
      const column = action.payload;
      const id = blocks.all[cursor.row];
      const block = blocks.byId[id];

      if (column < 0 || column > block.content.length) {
        return state;
      }

      return {
        ...state,
        cursor: {
          ...cursor,
          column,
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

      const indexInAll = blocks.all.indexOf(id);
      const lastSiblingIndexInAll = blocks.all.indexOf(parent.children[parent.children.length - 1]);

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
      }

      const grandParent = blocks.byId[parent.parent];
      const parentIndex = grandParent.children.indexOf(parent.id);

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
    mergeWithPreviousBlock: (state: DocumentState, action: PayloadAction<string>) => {
      const { blocks } = state;
      const id = action.payload;

      const index = blocks.all.indexOf(id);
      if (index === -1 || index === 0) {
        return state;
      }

      const block = blocks.byId[id];

      const previousBlockIndex = index - 1;
      const previousBlockId = blocks.all[previousBlockIndex];
      const previousBlock = blocks.byId[previousBlockId];

      const { [id]: _, ...byIdExceptFrom } = blocks.byId;
      let byId = block.children.reduce<object>((accumulator, childrenId) => ({
        ...accumulator,
        [childrenId]: {
          ...byIdExceptFrom[childrenId],
          parent: previousBlockId,
        },
      }), byIdExceptFrom);
      if (block.parent !== null) {
        const parentId = block.parent;
        const parent = blocks.byId[parentId];

        byId = {
          ...byId,
          [parentId]: {
            ...parent,
            children: parent.children.filter((child) => child !== id),
          },
        };
      }

      return {
        ...state,
        blocks: {
          ...blocks,
          byId: {
            ...byId,
            [previousBlockId]: {
              ...previousBlock,
              content: previousBlock.content + block.content,
              children: block.children,
            },
          },
          all: [
            ...blocks.all.slice(0, index),
            ...blocks.all.slice(index + 1),
          ],
        },
        cursor: {
          row: previousBlockIndex,
          column: previousBlock.content.length,
        },
      };
    },
  },
});

export const {
  addBlockNextTo,
  updateBlock,
  moveCursorUp,
  moveCursorDown,
  setCursorRow,
  setCursorColumn,
  indent,
  outdent,
  mergeWithPreviousBlock,
} = documentSlice.actions;

export default documentSlice.reducer;
