import reducer, {
  DocumentState, addLine, updateLine, mergeLine,
} from './documentSlice';

describe('documentSlice', () => {
  describe('addLine', () => {
    it('should add a new line after the line at the given index', () => {
      // given
      const currentState: DocumentState = {
        lines: ['LINE'],
      };

      // when
      const nextState = reducer(currentState, addLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toStrictEqual({
        lines: ['LINE', 'NEW_LINE'],
      });
    });
  });

  describe('updateLine', () => {
    it('should update the line at the given index with the given content', () => {
      // given
      const currentState: DocumentState = {
        lines: ['LINE'],
      };

      // when
      const nextState = reducer(currentState, updateLine({
        index: 0,
        content: 'NEW_LINE',
      }));

      // then
      expect(nextState).toStrictEqual({
        lines: ['NEW_LINE'],
      });
    });
  });

  describe('mergeLine', () => {
    it('should remove the line at the index \'from\' and append its content to the line at the index \'to\'', () => {
      // given
      const currentState: DocumentState = {
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
      expect(nextState1).toStrictEqual({
        lines: ['LINE2LINE1'],
      });
      expect(nextState2).toStrictEqual({
        lines: ['LINE1LINE2'],
      });
      expect(nextState3).toStrictEqual({
        lines: ['LINE1', 'LINE2'],
      });
    });
  });
});
