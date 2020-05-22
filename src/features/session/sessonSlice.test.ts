import reducers, {
  SessionState, moveCursorUp, moveCursorDown, setLength,
} from './sessionSlice';

describe('sessionSlice', () => {
  describe('moveCursorUp', () => {
    it('should move up the cursor', () => {
      // given
      const currentState: SessionState = {
        cursor: 1,
        length: 3,
      };

      // when
      const nextState = reducers(currentState, moveCursorUp());

      // then
      expect(nextState).toStrictEqual({
        cursor: 0,
        length: 3,
      });
    });

    it('should not move up the cursor when the cursor is on the top', () => {
      // given
      const currentState: SessionState = {
        cursor: 0,
        length: 3,
      };

      // when
      const nextState = reducers(currentState, moveCursorUp());

      // then
      expect(nextState).toStrictEqual({
        cursor: 0,
        length: 3,
      });
    });
  });

  describe('moveCursorDown', () => {
    it('should move down the cursor', () => {
      // given
      const currentState: SessionState = {
        cursor: 1,
        length: 3,
      };

      // when
      const nextState = reducers(currentState, moveCursorDown());

      // then
      expect(nextState).toStrictEqual({
        cursor: 2,
        length: 3,
      });
    });

    it('should not move down the cursor when the cursor is on the bottom', () => {
      // given
      const currentState: SessionState = {
        cursor: 2,
        length: 3,
      };

      // when
      const nextState = reducers(currentState, moveCursorDown());

      // then
      expect(nextState).toStrictEqual({
        cursor: 2,
        length: 3,
      });
    });
  });

  describe('setLength', () => {
    it('should set the length to the given length', () => {
      // given
      const currentState: SessionState = {
        cursor: 1,
        length: 0,
      };

      // when
      const nextState = reducers(currentState, setLength(1));

      // then
      expect(nextState).toStrictEqual({
        cursor: 1,
        length: 1,
      });
    });
  });
});
