import { DocumentState } from '../stores/documentState';
import turnOffToggleListBlockReducer from './turnOffToggleListBlock';

describe('turnOffToggleListBlock', () => {
  it('should set showChildren of the given toggle block state to false', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'toggleList',
            parent: null,
            content: 'LINE',
            children: [],
            showChildren: true,
          },
        },
        all: ['0'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = turnOffToggleListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE',
            children: [],
            showChildren: false,
          },
        },
      },
    });
  });

  it('should not update the given block state when it is not a toggle block', () => {
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
        },
        all: ['0'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = turnOffToggleListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toStrictEqual(currentState);
  });
});
