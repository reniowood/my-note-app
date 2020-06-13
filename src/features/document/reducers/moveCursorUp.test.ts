import { DocumentState } from '../stores/documentState';
import moveCursorUpReducer from './moveCursorUp';

describe('moveCursorUp', () => {
  it('should move up the cursor', () => {
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
        row: 1,
        column: 0,
      },
    };

    // when
    const nextState = moveCursorUpReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 0,
      },
    });
  });

  it('should not move up the cursor when the cursor is on the top', () => {
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
    const nextState = moveCursorUpReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 0,
      },
    });
  });

  it('should set the column to the last position when the length of the previous block is smaller than the column', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE',
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
        row: 1,
        column: 5,
      },
    };

    // when
    const nextState = moveCursorUpReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 0,
        column: 4,
      },
    });
  });
});
