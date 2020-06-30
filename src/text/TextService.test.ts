import { getCursorPosition, setCursorPosition } from './TextService';

describe('getCursorPosition', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the start offset of the first range of the selection', () => {
    // given
    const mockSelection = jest.fn() as unknown as Selection;
    jest.spyOn(document, 'getSelection').mockReturnValue(mockSelection);
    const mockFirstRange = jest.fn() as unknown as Range;
    mockSelection.getRangeAt = jest.fn().mockReturnValue(mockFirstRange);

    // when
    const cursorPosition = getCursorPosition();

    // then
    expect(cursorPosition).toBe(mockFirstRange.startOffset);
  });
});

describe('setCursorPosition', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make selection to have only one range located at a given position of a given element', () => {
    // given
    const element = document.createElement('div');
    element.innerHTML = 'CONTENT';
    jest.spyOn(element, 'focus');
    const mockSelection = jest.fn() as unknown as Selection;
    mockSelection.removeAllRanges = jest.fn();
    mockSelection.addRange = jest.fn();
    jest.spyOn(document, 'getSelection').mockReturnValue(mockSelection);
    const mockRange = jest.fn() as unknown as Range;
    mockRange.setStart = jest.fn();
    mockRange.collapse = jest.fn();
    jest.spyOn(document, 'createRange').mockReturnValue(mockRange);

    // when
    setCursorPosition(element, 0);

    // then
    expect(mockRange.setStart).toHaveBeenCalledWith(element.firstChild, 0);
    expect(mockRange.collapse).toHaveBeenCalledWith(true);
    expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    expect(element.focus).toHaveBeenCalledTimes(1);
  });
});
