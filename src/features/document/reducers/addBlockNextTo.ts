import { uuid } from 'uuidv4';
import { BlockId, DocumentState } from '../documentState';

export interface AddBlockNextToPayload {
  readonly id: BlockId;
  readonly content: string;
}

export default function addBlockNextToReducer(
  state: DocumentState,
  payload: AddBlockNextToPayload,
) {
  const { blocks } = state;
  const { id, content } = payload;

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
}