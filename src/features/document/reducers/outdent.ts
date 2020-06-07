import { DocumentState, BlockId } from '../documentState';

export interface OutdentPayload {
  readonly id: BlockId;
}

export default function outdentReducer(state: DocumentState, payload: OutdentPayload) {
  const { blocks } = state;
  const { id } = payload;

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
}
