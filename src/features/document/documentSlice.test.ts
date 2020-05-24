import reducer, {
  DocumentState, addLine, updateLine, mergeLine, moveCursorUp, moveCursorDown,
} from './documentSlice';

describe('documentSlice', () => {
  const initialState: DocumentState = {
    lines: [{
      id: '0',
      content: 'LINE',
    }],
    cursor: {
      row: 0,
      column: 0,
    },
  };

  describe('addLine', () => {
    it('should add a new line after the line at the given index', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
      };

      // when
      const nextState = reducer(currentState, addLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        lines: [{
          content: 'LINE',
        }, {
          content: 'NEW_LINE',
        }],
      });
    });
  });

  describe('updateLine', () => {
    it('should update the line at the given index with the given content', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
      };

      // when
      const nextState = reducer(currentState, updateLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        lines: [{
          content: 'NEW_LINE',
        }],
      });
    });
  });

  describe('mergeLine', () => {
    it('should remove the line at the index \'from\' and append its content to the line at the index \'to\'', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
        lines: [{
          id: '1',
          content: 'LINE1',
        }, {
          id: '2',
          content: 'LINE2',
        }],
      };

      // when
      const nextState1 = reducer(currentState, mergeLine({
        from: 0,
        to: 1,
      }));
      const nextState2 = reducer(currentState, mergeLine({
        from: 1,
        to: 0,
      }));
      const nextState3 = reducer(currentState, mergeLine({
        from: 1,
        to: 1,
      }));

      // then
      expect(nextState1).toMatchObject({
        lines: [{
          content: 'LINE2LINE1',
        }],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState2).toMatchObject({
        lines: [{
          content: 'LINE1LINE2',
        }],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState3).toMatchObject({
        lines: [{
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
        lines: [{
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
        lines: [{
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
        lines: [{
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
        lines: [{
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
});
