import { DocumentState } from '../stores/documentState';
import mergeWithPreviousBlockReducer from './mergeWithPreviousBlock';

describe('mrege', () => {
  it('should merge the given block with its previous block', () => {
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
            children: ['1', '2'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: '0',
            content: 'LINE3',
            children: ['3', '5'],
          },
          3: {
            id: '3',
            type: 'text',
            parent: '2',
            content: '3',
            children: ['4'],
          },
          4: {
            id: '4',
            type: 'text',
            parent: '3',
            content: '4',
            children: [],
          },
          5: {
            id: '5',
            type: 'text',
            parent: '2',
            content: '5',
            children: [],
          },
        },
        all: ['0', '1', '2', '3', '4', '5'],
      },
      cursor: {
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState = mergeWithPreviousBlockReducer(currentState, { id: '2' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE1',
            children: ['1'],
          },
          1: {
            id: '1',
            parent: '0',
            content: 'LINE2LINE3',
            children: ['3', '5'],
          },
          3: {
            id: '3',
            parent: '1',
            content: '3',
            children: ['4'],
          },
          4: {
            id: '4',
            parent: '3',
            content: '4',
            children: [],
          },
          5: {
            id: '5',
            parent: '1',
            content: '5',
            children: [],
          },
        },
        all: ['0', '1', '3', '4', '5'],
      },
      cursor: {
        row: 1,
        column: 5,
      },
    });
  });

  it('should not merge the given block with any block when the block is at the first', () => {
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
            children: ['1'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
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
    const nextState = mergeWithPreviousBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject(currentState);
  });

  it('should not change the current state when the block is not exist', () => {
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
    const nextState = mergeWithPreviousBlockReducer(currentState, { id: '3' });

    // then
    expect(nextState).toMatchObject(currentState);
  });
});
