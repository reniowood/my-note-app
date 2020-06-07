import { DocumentState } from '../documentState';

export interface SetCursorColumnPayload {
  readonly column: number;
}

export default function setCursorColumnReducer(
  state: DocumentState,
  payload: SetCursorColumnPayload,
) {
  const { cursor, blocks } = state;
  const { column } = payload;
  const id = blocks.all[cursor.row];
  const block = blocks.byId[id];

  if (column < 0 || column > block.content.length) {
    return state;
  }

  return {
    ...state,
    cursor: {
      ...cursor,
      column,
    },
  };
}
