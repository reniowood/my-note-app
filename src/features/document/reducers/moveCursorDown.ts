import { DocumentState } from '../stores/documentState';

export default function moveCursorDownReducer(state: DocumentState) {
  const { cursor, blocks } = state;
  const numBlocks = blocks.all.length;
  if (cursor.row === numBlocks - 1) {
    return state;
  }

  const nextBlockId = blocks.all[cursor.row + 1];
  const nextBlock = blocks.byId[nextBlockId];

  return {
    ...state,
    cursor: {
      row: cursor.row + 1,
      column: Math.min(cursor.column, nextBlock.content.length),
    },
  };
}
