import { uuid } from 'uuidv4';

export type BlockId = string;
export type BlockById = { [id: string]: BlockState };
export type BlocksState = { byId: BlockById, all: BlockId[] };

export interface DocumentState {
  readonly blocks: BlocksState;
  readonly cursor: CursorState;
}

export type BlockState =
  TextBlockState |
  CheckboxBlockState |
  UnorderedListBlockState;

export interface BaseBlockState {
  readonly type: string;
  readonly id: BlockId;
  readonly parent: BlockId | null;
  readonly children: BlockId[];
}

export interface TextBlockState extends BaseBlockState {
  readonly type: 'text';
  readonly content: string;
}

export interface CheckboxBlockState extends BaseBlockState {
  readonly type: 'checkbox';
  readonly content: string;
  readonly isChecked: boolean;
}

export interface UnorderedListBlockState extends BaseBlockState {
  readonly type: 'unorderedList';
  readonly content: string;
}

export interface CursorState {
  readonly row: number;
  readonly column: number;
}

function createInitialState(): DocumentState {
  const initialBlock: BlockState = {
    id: uuid(),
    type: 'text',
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

export const initialState: DocumentState = createInitialState();
