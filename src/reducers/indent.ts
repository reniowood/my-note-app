import { DocumentState, BlockId } from '../stores/documentState';

export interface IndentPayload {
  readonly id: BlockId;
}

export default function indentReducer(state: DocumentState, payload: IndentPayload) {
  const { blocks } = state;
  const { id } = payload;

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
}
