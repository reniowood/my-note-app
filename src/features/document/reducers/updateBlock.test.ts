import { DocumentState } from '../documentState';
import updateBlockReducer from './updateBlock';

describe('updateBlock', () => {
  it('should update the block at the given index with the given content', () => {
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

    // when
    const nextState = updateBlockReducer(currentState, {
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
            content: 'NEW_LINE',
            parent: null,
            children: [],
          },
        },
      },
    });
  });
});
