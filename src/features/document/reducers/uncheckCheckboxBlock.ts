import { DocumentState } from '../documentState';

export interface CheckCheckboxBlockPayload {
  readonly id: string;
}

export default function uncheckCheckboxBlockReducer(
  state: DocumentState,
  payload: CheckCheckboxBlockPayload,
) {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (block.type !== 'checkbox') {
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
          isChecked: false,
        },
      },
    },
  };
}
