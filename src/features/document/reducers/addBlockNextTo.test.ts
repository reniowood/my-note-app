import { uuid } from 'uuidv4';
import { mocked } from 'ts-jest/utils';
import { DocumentState } from '../stores/documentState';
import addBlockNextToReducer from './addBlockNextTo';

jest.mock('uuidv4');

describe('addBlockNextTo', () => {
  it('should add a new block after the given block', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            content: 'LINE',
            parent: null,
            children: [],
          },
        },
        all: ['0'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };
    mocked(uuid).mockReturnValue('1');

    // when
    const nextState = addBlockNextToReducer(currentState, {
      id: '0',
      content: 'NEW_LINE',
    });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            content: 'LINE',
            parent: null,
            children: [],
          },
          1: {
            id: '1',
            type: 'text',
            content: 'NEW_LINE',
            parent: null,
            children: [],
          },
        },
        all: ['0', '1'],
      },
    });
  });

  it('should add a new block after the given block, which is a child of another block', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            content: 'LINE',
            parent: null,
            children: ['1'],
          },
          1: {
            id: '1',
            type: 'text',
            content: 'LINE2',
            parent: '0',
            children: [],
          },
        },
        all: ['0', '1'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };
    mocked(uuid).mockReturnValue('2');

    // when
    const nextState = addBlockNextToReducer(currentState, {
      id: '1',
      content: 'NEW_LINE',
    });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            content: 'LINE',
            parent: null,
            children: ['1', '2'],
          },
          1: {
            id: '1',
            type: 'text',
            content: 'LINE2',
            parent: '0',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            content: 'NEW_LINE',
            parent: '0',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
    });
  });

  it('should add a new block after the given block when there is a sibling next to it', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            content: 'LINE',
            parent: null,
            children: ['1', '2'],
          },
          1: {
            id: '1',
            type: 'text',
            content: 'LINE2',
            parent: '0',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            content: 'LINE3',
            parent: '0',
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
    mocked(uuid).mockReturnValue('3');

    // when
    const nextState = addBlockNextToReducer(currentState, {
      id: '1',
      content: 'NEW_LINE',
    });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            content: 'LINE',
            parent: null,
            children: ['1', '3', '2'],
          },
          1: {
            id: '1',
            type: 'text',
            content: 'LINE2',
            parent: '0',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            content: 'LINE3',
            parent: '0',
            children: [],
          },
          3: {
            id: '3',
            type: 'text',
            content: 'NEW_LINE',
            parent: '0',
            children: [],
          },
        },
        all: ['0', '1', '3', '2'],
      },
    });
  });
});
