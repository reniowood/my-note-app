import { uuid } from 'uuidv4';

export type BlockId = string;

export interface DocumentState {
  readonly blocks: { byId: { [id: string]: BlockState }, all: BlockId[] };
  readonly cursor: CursorState;
}

export type BlockState = TextBlockState | CheckboxBlockState;

export interface BaseBlockState {
  readonly id: BlockId;
  readonly parent: BlockId | null;
  readonly children: BlockId[];
}

export interface TextBlockState extends BaseBlockState {
  readonly content: string;
}

export interface CheckboxBlockState extends TextBlockState {
  readonly isChecked: boolean;
}

export function isCheckboxBlock(block: BlockState): block is CheckboxBlockState {
  return (block as CheckboxBlockState).isChecked !== undefined;
}

export interface CursorState {
  readonly row: number;
  readonly column: number;
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

export const initialState = createInitialState();
