import { uuid } from 'uuidv4';
import {
  BlockId,
  DocumentState,
  BlockState,
  BlocksState,
  BlockById,
} from '../stores/documentState';

export interface AddBlockNextToPayload {
  readonly id: BlockId;
  readonly content: string;
}

function isLastBlock(blocks: BlocksState, id: BlockId): boolean {
  const index = blocks.all.indexOf(id);
  return index !== -1 && index === blocks.all.length - 1;
}

function isNextBlockIsItsFirstChild(blocks: BlocksState, id: BlockId): boolean {
  if (isLastBlock(blocks, id)) {
    return false;
  }

  const index = blocks.all.indexOf(id);
  const nextBlockIndex = index + 1;
  const nextBlockId = blocks.all[nextBlockIndex];
  const nextBlock = blocks.byId[nextBlockId];

  return nextBlock.parent === id;
}

function shouldNewBlockBeAddedAsFirstChild(blocks: BlocksState, id: BlockId): boolean {
  return isNextBlockIsItsFirstChild(blocks, id);
}

function updateBlockIfNeeded(
  blocks: BlocksState,
  id: BlockId,
  newId: BlockId,
): BlockState {
  const block = blocks.byId[id];

  if (shouldNewBlockBeAddedAsFirstChild(blocks, id)) {
    return {
      ...block,
      children: [
        newId,
        ...block.children,
      ],
    };
  }

  return block;
}

function updateParentIfNeeded(
  blocks: BlocksState,
  id: BlockId,
  newId: BlockId,
): BlockById {
  let newParent = {};

  if (shouldNewBlockBeAddedAsFirstChild(blocks, id)) {
    return newParent;
  }

  const parentId = blocks.byId[id].parent;
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

  return newParent;
}

function createNewBlock(
  blocks: BlocksState,
  id: BlockId,
  newId: BlockId,
  content: string,
): BlockState {
  const block = blocks.byId[id];

  let parentId = block.parent;
  if (shouldNewBlockBeAddedAsFirstChild(blocks, id)) {
    parentId = id;
  }

  let newBlock: BlockState;

  if (block.type === 'unorderedList') {
    newBlock = {
      id: newId,
      type: 'unorderedList',
      parent: parentId,
      children: [],
      content,
    };
  } else if (block.type === 'orderedList') {
    newBlock = {
      id: newId,
      type: 'orderedList',
      parent: parentId,
      children: [],
      content,
    };
  } else if (block.type === 'checkbox') {
    newBlock = {
      id: newId,
      type: 'checkbox',
      parent: parentId,
      children: [],
      isChecked: false,
      content,
    };
  } else {
    newBlock = {
      id: newId,
      type: 'text',
      parent: parentId,
      children: [],
      content,
    };
  }

  return newBlock;
}

export default function addBlockNextToReducer(
  state: DocumentState,
  payload: AddBlockNextToPayload,
) {
  const { blocks } = state;
  const { id, content } = payload;

  const newId = uuid();
  const block = updateBlockIfNeeded(blocks, id, newId);
  const parentBlock = updateParentIfNeeded(blocks, id, newId);
  const newBlock = createNewBlock(blocks, id, newId, content);

  const index = blocks.all.indexOf(id);

  return {
    ...state,
    blocks: {
      byId: {
        ...blocks.byId,
        ...parentBlock,
        [id]: block,
        [newId]: newBlock,
      },
      all: [
        ...blocks.all.slice(0, index + 1),
        newId,
        ...blocks.all.slice(index + 1),
      ],
    },
  };
}
