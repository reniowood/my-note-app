import reducer, {
  DocumentState, addBlock, updateBlock, mergeBlock, moveCursorUp, moveCursorDown, setCursorRow,
} from './documentSlice';

describe('documentSlice', () => {
  const initialState: DocumentState = {
    blocks: [{
      id: '0',
      content: 'LINE',
    }],
    cursor: {
      row: 0,
      column: 0,
    },
  };

  describe('addBlock', () => {
    it('should add a new block after the block at the given index', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
      };

      // when
      const nextState = reducer(currentState, addBlock({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        blocks: [{
          content: 'LINE',
        }, {
          content: 'NEW_LINE',
        }],
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
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        blocks: [{
          content: 'NEW_LINE',
        }],
      });
    });
  });

  describe('mergeBlock', () => {
    it('should remove the block at the index \'from\' and append its content to the block at the index \'to\'', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }],
      };

      // when
      const nextState1 = reducer(currentState, mergeBlock({
        from: 0,
        to: 1,
      }));
      const nextState2 = reducer(currentState, mergeBlock({
        from: 1,
        to: 0,
      }));
      const nextState3 = reducer(currentState, mergeBlock({
        from: 1,
        to: 1,
      }));

      // then
      expect(nextState1).toMatchObject({
        blocks: [{
          content: 'LINE2LINE1',
        }],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState2).toMatchObject({
        blocks: [{
          content: 'LINE1LINE2',
        }],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState3).toMatchObject({
        blocks: [{
          content: 'LINE1',
        }, {
          content: 'LINE2',
        }],
        cursor: {
          row: 0,
          column: 0,
        },
      });
    });
  });

  describe('moveCursorUp', () => {
    it('should move up the cursor', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
  });

  describe('moveCursorDown', () => {
    it('should move down the cursor', () => {
      // given
      const currentState: DocumentState = {
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
  });

  describe('setCursorRow', () => {
    it('should set the row of the cursor to the given row', () => {
      // given
      const currentState: DocumentState = {
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
        blocks: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }, {
          id: '3',
          content: 'LINE3',
        }],
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
});
