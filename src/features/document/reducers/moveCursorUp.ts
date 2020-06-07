import { DocumentState } from '../documentState';

export default function moveCursorUpReducer(state: DocumentState) {
  const { cursor, blocks } = state;
  if (cursor.row === 0) {
    return state;
  }

  const prevBlockId = blocks.all[cursor.row - 1];
  const prevBlock = blocks.byId[prevBlockId];

  return {
    ...state,
    cursor: {
      row: cursor.row - 1,
      column: Math.min(cursor.column, prevBlock.content.length),
    },
  };
}
