import reducer, {
  DocumentState, addLine, updateLine, mergeLine, moveCursorUp, moveCursorDown,
} from './documentSlice';

describe('documentSlice', () => {
  const initialState: DocumentState = {
    lines: [],
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
        lines: ['LINE'],
      };

      // when
      const nextState = reducer(currentState, addLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        lines: ['LINE', 'NEW_LINE'],
      });
    });
  });

  describe('updateLine', () => {
    it('should update the line at the given index with the given content', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
        lines: ['LINE'],
      };

      // when
      const nextState = reducer(currentState, updateLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toMatchObject({
        lines: ['NEW_LINE'],
      });
    });
  });

  describe('mergeLine', () => {
    it('should remove the line at the index \'from\' and append its content to the line at the index \'to\'', () => {
      // given
      const currentState: DocumentState = {
        ...initialState,
        lines: ['LINE1', 'LINE2'],
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
        lines: ['LINE2LINE1'],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState2).toMatchObject({
        lines: ['LINE1LINE2'],
        cursor: {
          row: 0,
          column: 5,
        },
      });
      expect(nextState3).toMatchObject({
        lines: ['LINE1', 'LINE2'],
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
        lines: ['LINE1', 'LINE2', 'LINE3'],
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
        lines: ['LINE1', 'LINE2', 'LINE3'],
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
        lines: ['LINE1', 'LINE2', 'LINE3'],
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
        lines: ['LINE1', 'LINE2', 'LINE3'],
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
