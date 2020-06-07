import { DocumentState } from '../documentState';
import setCursorRowReducer from './setCursorRow';

describe('setCursorRow', () => {
  it('should set the row of the cursor to the given row', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE1',
            children: [],
          },
          1: {
            id: '1',
            parent: null,
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
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
    const nextState = setCursorRowReducer(currentState, { row: 0 });

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 0,
      },
    });
  });

  it('should not update the row of the cursor when the given row is invalid', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE1',
            children: [],
          },
          1: {
            id: '1',
            parent: null,
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
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
    const nextState1 = setCursorRowReducer(currentState, { row: -1 });
    const nextState2 = setCursorRowReducer(currentState, { row: 4 });

    // then
    expect(nextState1).toMatchObject({
      cursor: {
        row: 2,
      },
    });
    expect(nextState2).toMatchObject({
      cursor: {
        row: 2,
      },
    });
  });
});
