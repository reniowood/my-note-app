import { DocumentState } from '../documentState';

export interface ConvertBlockToCheckboxBlockPayload {
  readonly id: string;
}

export default function convertBlockToCheckboxBlockReducer(
  state: DocumentState,
  payload: ConvertBlockToCheckboxBlockPayload,
): DocumentState {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type === 'checkbox') {
    return state;
  }

  return {
    ...state,
    blocks: {
      ...blocks,
      byId: {
        ...blocks.byId,
        [id]: {
          ...block,
          type: 'checkbox',
          isChecked: false,
        },
      },
    },
  };
}
