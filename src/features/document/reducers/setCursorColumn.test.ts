import setCursorColumnReducer from './setCursorColumn';
import { DocumentState } from '../stores/documentState';

describe('setCursorColumn', () => {
  it('should set the column of the cursor to the given column', () => {
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
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState = setCursorColumnReducer(currentState, { column: 2 });

    // then
    expect(nextState).toMatchObject({
      cursor: {
        column: 2,
      },
    });
  });

  it('should not update the column of the cursor when the given column is invalid', () => {
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
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState1 = setCursorColumnReducer(currentState, { column: -1 });
    const nextState2 = setCursorColumnReducer(currentState, { column: 6 });

    // then
    expect(nextState1).toMatchObject({
      cursor: {
        column: 0,
      },
    });
    expect(nextState2).toMatchObject({
      cursor: {
        column: 0,
      },
    });
  });
});
