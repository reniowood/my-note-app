import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  LineState, CursorState,
  addLine, updateLine, mergeLine, moveCursorDown, moveCursorUp,
} from '../document/documentSlice';

interface LineProps {
  readonly index: number;
  readonly cursor: CursorState;
  readonly line: LineState;
}

function getCursorPosition(): number | undefined {
  const selection = document.getSelection();
  const range = selection?.getRangeAt(0);
  return range?.startOffset;
}

function setCursorPosition(element: HTMLElement, position: number) {
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

export default function Line(props: LineProps) {
  const { index, cursor, line } = props;
  const { content } = line;
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (index === cursor.row) {
      if (ref.current) {
        setCursorPosition(ref.current, cursor.column);
      }
    }
  });

  const updateLineContent = (element: HTMLElement) => {
    dispatch(updateLine({
      index,
      content: element.innerText,
    }));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const element = e.currentTarget;
        dispatch(updateLine({
          index,
          content: element.innerText?.substring(0, cursorPosition),
        }));
        dispatch(addLine({
          index,
          content: element.innerText?.substring(cursorPosition),
        }));
      }

      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const element = e.currentTarget;
      updateLineContent(element);
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const element = e.currentTarget;
      updateLineContent(element);
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.key === 'Backspace') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition === 0 && index > 0) {
        const element = e.currentTarget;
        updateLineContent(element);
        dispatch(mergeLine({
          from: index,
          to: index - 1,
        }));

        e.preventDefault();
      }
    }
  };

  return (
    <li role="row" ref={ref} contentEditable="true" tabIndex={index} onKeyDown={(e) => onKeyDown(e)}>
      {content}
    </li>
  );
}
