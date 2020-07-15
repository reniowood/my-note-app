import { uuid } from 'uuidv4';

export type BlockId = string;
export type BlockById = { [id: string]: BlockState };
export type BlocksState = { byId: BlockById, all: BlockId[] };

export interface DocumentState {
  readonly version: Version;
  readonly blocks: BlocksState;
  readonly cursor: CursorState;
}

export type Version = 1;

export type BlockType = BlockState['type'];

export type BlockState =
  | TextBlockState
  | CheckboxBlockState
  | UnorderedListBlockState
  | OrderedListBlockState
  | ToggleListBlockState
  | HeadingBlockState;

export interface BaseBlockState {
  readonly id: BlockId;
  readonly parent: BlockId | null;
  readonly children: BlockId[];
  readonly content: string;
}

export interface TextBlockState extends BaseBlockState {
  readonly type: 'text';
}

export interface CheckboxBlockState extends BaseBlockState {
  readonly type: 'checkbox';
  readonly isChecked: boolean;
}

export interface UnorderedListBlockState extends BaseBlockState {
  readonly type: 'unorderedList';
}

export interface OrderedListBlockState extends BaseBlockState {
  readonly type: 'orderedList';
}

export interface ToggleListBlockState extends BaseBlockState {
  readonly type: 'toggleList';
  readonly showChildren: boolean;
}

export interface HeadingBlockState extends BaseBlockState {
  readonly type: 'heading1' | 'heading2' | 'heading3';
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
    version: 1,
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
