import { DocumentState } from '../stores/documentState';

export interface ConvertBlockToToggleListBlockPayload {
  readonly id: string;
}

export default function convertBlockToToggleListBlockReducer(
  state: DocumentState,
  payload: ConvertBlockToToggleListBlockPayload,
): DocumentState {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type === 'toggleList') {
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
          type: 'toggleList',
          showChildren: true,
        },
      },
    },
  };
}
