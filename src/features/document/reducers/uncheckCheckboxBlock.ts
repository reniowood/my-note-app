import { DocumentState, CheckboxBlockState, BlockState } from '../documentState';

export interface CheckCheckboxBlockPayload {
  readonly id: string;
}

function isCheckboxBlock(block: BlockState): block is CheckboxBlockState {
  return (block as CheckboxBlockState).isChecked !== undefined;
}

export default function uncheckCheckboxBlockReducer(
  state: DocumentState,
  payload: CheckCheckboxBlockPayload,
) {
  const { blocks } = state;
  const { id } = payload;

  const block = blocks.byId[id];

  if (!isCheckboxBlock(block)) {
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
