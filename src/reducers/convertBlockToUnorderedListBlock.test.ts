import convertBlockToUnorderedListBlockReducer from './convertBlockToUnorderedListBlock';
import { DocumentState } from '../stores/documentState';

describe('convertBlockToUnorderedListBlockReducer', () => {
  it('should convert a given block into an unordered list block', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'checkbox',
            parent: null,
            content: 'LINE',
            children: [],
            isChecked: false,
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
    const nextState = convertBlockToUnorderedListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'unorderedList',
            parent: null,
            content: 'LINE',
            children: [],
          },
        },
      },
    });
  });

  it('should not change any value of a given block when it is already a text block', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'unorderedList',
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
    const nextState = convertBlockToUnorderedListBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toStrictEqual(currentState);
  });
});
