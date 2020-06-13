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

  const { isChecked: _, ...textBlock } = block;

  return {
    ...state,
    blocks: {
      ...blocks,
      byId: {
        ...blocks.byId,
        [id]: {
          ...textBlock,
          type: 'text',
        },
      },
    },
  };
}
