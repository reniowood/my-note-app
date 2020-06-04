import { uuid } from 'uuidv4';
import { mocked } from 'ts-jest/utils';
import reducer, {
  DocumentState,
  addBlockNextTo,
  updateBlock,
  moveCursorUp,
  moveCursorDown,
  setCursorRow,
  setCursorColumn,
} from './documentSlice';

jest.mock('uuidv4');

describe('documentSlice', () => {
  const initialState: DocumentState = {
    blocks: {
      byId: {
        0: {
          id: '0',
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

  describe('addBlockNextTo', () => {
    it('should add a new block after the given block', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
      };
      mocked(uuid).mockReturnValue('1');

      // when
      const nextState = reducer(currentState, addBlockNextTo({
        id: '0',
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        blocks: {
          byId: {
            0: {
              id: '0',
              content: 'LINE',
              parent: null,
              children: [],
            },
            1: {
              id: '1',
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
              content: 'LINE',
              parent: null,
              children: ['1'],
            },
            1: {
              id: '1',
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
      const nextState = reducer(currentState, addBlockNextTo({
        id: '1',
        content: 'NEW_LINE',
      }));

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
              content: 'LINE2',
              parent: '0',
              children: [],
            },
            2: {
              id: '2',
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
              content: 'LINE',
              parent: null,
              children: ['1', '2'],
            },
            1: {
              id: '1',
              content: 'LINE2',
              parent: '0',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, addBlockNextTo({
        id: '1',
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        blocks: {
          byId: {
            0: {
              id: '0',
              content: 'LINE',
              parent: null,
              children: ['1', '3', '2'],
            },
            1: {
              id: '1',
              content: 'LINE2',
              parent: '0',
              children: [],
            },
            2: {
              id: '2',
              content: 'LINE3',
              parent: '0',
              children: [],
            },
            3: {
              id: '3',
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

  describe('updateBlock', () => {
    it('should update the block at the given index with the given content', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
      };

      // when
      const nextState = reducer(currentState, updateBlock({
        id: '0',
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        blocks: {
          byId: {
            0: {
              id: '0',
              content: 'NEW_LINE',
              parent: null,
              children: [],
            },
          },
        },
      });
    });
  });

  describe('moveCursorUp', () => {
    it('should move up the cursor', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorUp());

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
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorUp());

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
              parent: null,
              content: 'LINE',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorUp());

      // then
      expect(nextState).toMatchObject({
        cursor: {
          row: 0,
          column: 4,
        },
      });
    });
  });

  describe('moveCursorDown', () => {
    it('should move down the cursor', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorDown());

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
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorDown());

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
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: '',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, moveCursorDown());

      // then
      expect(nextState).toMatchObject({
        cursor: {
          row: 1,
          column: 0,
        },
      });
    });
  });

  describe('setCursorRow', () => {
    it('should set the row of the cursor to the given row', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, setCursorRow(0));

      // then
      expect(nextState).toMatchObject({
        cursor: {
          row: 0,
        },
      });
    });

    it('should not update the row of the cursor when the given row is invalid', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState1 = reducer(currentState, setCursorRow(-1));
      const nextState2 = reducer(currentState, setCursorRow(4));

      // then
      expect(nextState1).toMatchObject({
        cursor: {
          row: 2,
        },
      });
      expect(nextState2).toMatchObject({
        cursor: {
          row: 2,
        },
      });
    });
  });

  describe('setCursorColumn', () => {
    it('should set the column of the cursor to the given column', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState = reducer(currentState, setCursorColumn(2));

      // then
      expect(nextState).toMatchObject({
        cursor: {
          column: 2,
        },
      });
    });

    it('should not update the column of the cursor when the given column is invalid', () => {
      // given
      const currentState: DocumentState = {
        blocks: {
          byId: {
            0: {
              id: '0',
              parent: null,
              content: 'LINE1',
              children: [],
            },
            1: {
              id: '1',
              parent: null,
              content: 'LINE2',
              children: [],
            },
            2: {
              id: '2',
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
      const nextState1 = reducer(currentState, setCursorColumn(-1));
      const nextState2 = reducer(currentState, setCursorColumn(6));

      // then
      expect(nextState1).toMatchObject({
        cursor: {
          column: 0,
        },
      });
      expect(nextState2).toMatchObject({
        cursor: {
          column: 0,
        },
      });
    });
  });
});
