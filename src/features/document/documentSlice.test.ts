import reducer, { DocumentState, addLine, updateLine } from './documentSlice';

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
});
