import { DocumentState } from '../documentState';

export interface SetCursorRowPayload {
  readonly row: number;
}

export default function setCursorRowReducer(state: DocumentState, payload: SetCursorRowPayload) {
  const { cursor, blocks } = state;
  const { row } = payload;
  const numBlocks = blocks.all.length;

  if (row < 0 || row >= numBlocks) {
    return state;
  }

  return {
    ...state,
    cursor: {
      ...cursor,
      row,
    },
  };
}
