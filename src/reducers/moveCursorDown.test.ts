import { DocumentState } from '../stores/documentState';
import moveCursorDownReducer from './moveCursorDown';

describe('moveCursorDown', () => {
  it('should move down the cursor', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
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
    const nextState = moveCursorDownReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 2,
      },
    });
  });

  it('should not move down the cursor when the cursor is on the bottom', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
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
    const nextState = moveCursorDownReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 2,
      },
    });
  });

  it('should set the column to the last position when the length of the next block is smaller than the column', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
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
            content: '',
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
        column: 4,
      },
    };

    // when
    const nextState = moveCursorDownReducer(currentState);

    // then
    expect(nextState).toMatchObject({
      cursor: {
        row: 1,
        column: 0,
      },
    });
  });
});
