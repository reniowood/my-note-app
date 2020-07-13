import { BlockType } from './documentState';
import {
  getConverter,
  convertBlockToTextBlock,
  convertBlockToCheckboxBlock,
  convertBlockToUnorderedListBlock,
  convertBlockToOrderedListBlock,
  convertBlockToToggleListBlock,
} from './documentSlice';

describe('getConverter', () => {
  it('should give convertBlockToTextBlock when the type is text', () => {
    // given
    const type: BlockType = 'text';

    // when
    const converter = getConverter(type);

    // then
    expect(converter).toBe(convertBlockToTextBlock);
  });

  it('should give convertBlockToCheckboxBlock when the type is checkbox', () => {
    // given
    const type: BlockType = 'checkbox';

    // when
    const converter = getConverter(type);

    // then
    expect(converter).toBe(convertBlockToCheckboxBlock);
  });

  it('should give convertBlockToUnorderedListBlock when the type is unorderedList', () => {
    // given
    const type: BlockType = 'unorderedList';

    // when
    const converter = getConverter(type);

    // then
    expect(converter).toBe(convertBlockToUnorderedListBlock);
  });

  it('should give convertBlockToOrderedListBlock when the type is orderedList', () => {
    // given
    const type: BlockType = 'orderedList';

    // when
    const converter = getConverter(type);

    // then
    expect(converter).toBe(convertBlockToOrderedListBlock);
  });

  it('should give convertBlockToToggleListBlock when the type is toggleList', () => {
    // given
    const type: BlockType = 'toggleList';

    // when
    const converter = getConverter(type);

    // then
    expect(converter).toBe(convertBlockToToggleListBlock);
  });
});
