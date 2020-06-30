import { DocumentState } from '../stores/documentState';

export interface ConvertBlockToTextBlockPayload {
  readonly id: string;
}

export default function convertBlockToTextBlockReducer(
  state: DocumentState,
  payload: ConvertBlockToTextBlockPayload,
): DocumentState {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type === 'text') {
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
          type: 'text',
        },
      },
    },
  };
}
