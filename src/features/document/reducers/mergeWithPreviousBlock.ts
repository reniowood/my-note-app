import { DocumentState, BlockId } from '../documentState';

export interface MergeWithPreviousBlockPayload {
  readonly id: BlockId;
}

export default function mergeWithPreviousBlockReducer(
  state: DocumentState,
  payload: MergeWithPreviousBlockPayload,
) {
  const { blocks } = state;
  const { id } = payload;

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
}
