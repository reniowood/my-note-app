import { selectPreviousBlock, selectFocusedBlock } from './documentSelector';
import { RootState } from './store';

describe('selectPreviousBlock', () => {
  it('should return a function select the previous block of the block at the given index', () => {
    // given
    const state: RootState = {
      version: 1,
      blocks: {
        byId: {
          1: {
            id: '1',
            type: 'text',
            parent: null,
            content: '1',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
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
      type: 'text',
      parent: null,
      content: '1',
      children: [],
    });
  });

  it('should return a function returns null when the given index is invalid', () => {
    // given
    const state: RootState = {
      version: 1,
      blocks: {
        byId: {
          1: {
            id: '1',
            type: 'text',
            parent: null,
            content: '1',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
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

describe('selectFocusedBlock', () => {
  it('should select the focused block', () => {
    // given
    const state: RootState = {
      version: 1,
      blocks: {
        byId: {
          1: {
            id: '1',
            type: 'text',
            parent: null,
            content: '1',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: '2',
            children: [],
          },
        },
        all: ['1', '2'],
      },
      cursor: {
        row: 1,
        column: 0,
      },
    };

    // when
    const block = selectFocusedBlock(state);

    // then
    expect(block).toStrictEqual({
      id: '2',
      type: 'text',
      parent: null,
      content: '2',
      children: [],
    });
  });
});
