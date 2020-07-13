import { DocumentState } from '../stores/documentState';

export interface TurnOffToggleListBlockPayload {
  readonly id: string;
}

export default function turnOffToggleListBlockReducer(
  state: DocumentState,
  payload: TurnOffToggleListBlockPayload,
) {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type !== 'toggleList') {
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
          showChildren: false,
        },
      },
    },
  };
}
