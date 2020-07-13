import { DocumentState } from '../stores/documentState';

export interface TurnOnToggleListBlockPayload {
  readonly id: string;
}

export default function turnOnToggleListBlockReducer(
  state: DocumentState,
  payload: TurnOnToggleListBlockPayload,
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
          showChildren: true,
        },
      },
    },
  };
}
