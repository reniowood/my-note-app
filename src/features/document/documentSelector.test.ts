import { selectPreviousBlock } from './documentSelector';
import { RootState } from '../../app/store';

describe('selectPreviousBlock', () => {
  it('should return a function select the previous block of the block at the given index', () => {
    // given
    const state: RootState = {
      blocks: {
        byId: {
          1: {
            id: '1',
            parent: null,
            content: '1',
            children: [],
          },
          2: {
            id: '2',
            parent: null,
            content: '2',
            children: [],
          },
        },
        all: ['1', '2'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const selector = selectPreviousBlock(1);

    // then
    expect(selector(state)).toStrictEqual({
      id: '1',
      parent: null,
      content: '1',
      children: [],
    });
  });

  it('should return a function returns null when the given index is invalid', () => {
    // given
    const state: RootState = {
      blocks: {
        byId: {
          1: {
            id: '1',
            parent: null,
            content: '1',
            children: [],
          },
          2: {
            id: '2',
            parent: null,
            content: '2',
            children: [],
          },
        },
        all: ['1', '2'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const selector1 = selectPreviousBlock(0);
    const selector2 = selectPreviousBlock(2);

    // then
    expect(selector1(state)).toBeNull();
    expect(selector2(state)).toBeNull();
  });
});
