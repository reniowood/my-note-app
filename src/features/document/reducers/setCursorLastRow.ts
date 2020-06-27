import { DocumentState } from '../stores/documentState';

export default function setCursorLastRowReducer(state: DocumentState) {
  const { cursor, blocks } = state;
  const numBlocks = blocks.all.length;

  return {
    ...state,
    cursor: {
      ...cursor,
      row: numBlocks - 1,
      column: 0,
    },
  };
}
