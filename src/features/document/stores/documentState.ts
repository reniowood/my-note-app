import { uuid } from 'uuidv4';

export type BlockId = string;

export interface DocumentState {
  readonly blocks: { byId: { [id: string]: BlockState }, all: BlockId[] };
  readonly cursor: CursorState;
}

export type BlockState = TextBlockState | CheckboxBlockState;

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