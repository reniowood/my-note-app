import { DocumentState, BlockId } from '../stores/documentState';
import mergeWithPreviousBlockReducer from './mergeWithPreviousBlock';
import outdentReducer from './outdent';

export interface MergeOrOutdentPayload {
  readonly id: BlockId;
}

export default function mergeOrOutdentReducer(
  state: DocumentState,
  payload: MergeOrOutdentPayload,
) {
  const { blocks } = state;
  const { id } = payload;

  const index = blocks.all.indexOf(id);
  if (index === -1 || index === 0) {
    return state;
  }

  const previousBlockId = blocks.all[index - 1];
  const previousBlock = blocks.byId[previousBlockId];
  const block = blocks.byId[id];
  if (previousBlock !== null && previousBlock.parent === block.parent) {
    return mergeWithPreviousBlockReducer(state, {
      id,
    });
  }

  return outdentReducer(state, {
    id,
  });
}
