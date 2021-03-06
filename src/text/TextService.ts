export function getCursorPosition(): [number, number] | undefined {
  const selection = document.getSelection();
  const range = selection?.getRangeAt(0);
  return range && [range.startOffset, range.endOffset];
}

export function setCursorPosition(element: HTMLElement, position: number) {
  const range = document.createRange();
  if (element.firstChild) {
    range.setStart(element.firstChild, position);
    range.collapse(true);
  }

  const selection = document.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  element.focus();
}
