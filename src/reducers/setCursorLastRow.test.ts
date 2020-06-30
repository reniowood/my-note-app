import { DocumentState } from '../stores/documentState';
import setCursorLastRowReducer from './setCursorLastRow';

describe('setCursorLastRow', () => {
  it('should set the row of the cursor to the last row', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: [],
          },
          1: {
            id: '1',
            type: 'text',
            parent: null,
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = setCursorLastRowReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 2,
        column: 0,
      },
    });
  });
});
