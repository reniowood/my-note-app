import { DocumentState } from '../stores/documentState';

export interface ConvertBlockToUnorderedListBlockPayload {
  readonly id: string;
}

export default function convertBlockToUnorderedListBlockReducer(
  state: DocumentState,
  payload: ConvertBlockToUnorderedListBlockPayload,
): DocumentState {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type === 'unorderedList') {
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
          type: 'unorderedList',
        },
      },
    },
  };
}
