import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLine, updateLine, mergeLine, moveCursorDown, moveCursorUp,
} from '../document/documentSlice';
import { selectCursor } from '../document/documentSelector';

interface LineProps {
  readonly index: number;
  readonly content: string;
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
  const { index, content } = props;
  const cursor = useSelector(selectCursor);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    <li>
      <div role="row" ref={ref} contentEditable="true" tabIndex={index} onKeyDown={(e) => onKeyDown(e)}>
        {content}
      </div>
    </li>
  );
}
