import convertBlockToToggleListBlockReducer from './convertBlockToToggleListBlock';
import { DocumentState } from '../stores/documentState';

describe('convertBlockToToggleListBlock', () => {
  it('should convert a given block into a toggle block', () => {
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
    const nextState = convertBlockToToggleListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE',
            children: [],
            showChildren: true,
          },
        },
      },
    });
  });

  it('should not change its isChecked value of a given block when it is already a toggle block', () => {
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
    const nextState = convertBlockToToggleListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toStrictEqual(currentState);
  });
});
