import { DocumentState } from '../stores/documentState';

export interface ConvertBlockToOrderedListBlockPayload {
  readonly id: string;
}

export default function convertBlockToOrderedListBlockReducer(
  state: DocumentState,
  payload: ConvertBlockToOrderedListBlockPayload,
): DocumentState {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type === 'orderedList') {
    return state;
  }

  return {
    ...state,
    blocks: {
      ...blocks,
      byId: {
        ...blocks.byId,
        [id]: {
          id: block.id,
          parent: block.parent,
          children: block.children,
          content: block.content,
          type: 'orderedList',
        },
      },
    },
  };
}
