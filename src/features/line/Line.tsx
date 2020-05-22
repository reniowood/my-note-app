import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLine, updateLine } from '../document/documentSlice';
import {
  moveCursorDown, setLength, moveCursorUp,
} from '../session/sessionSlice';
import { selectLength, selectCursor } from '../session/sessionSelector';

interface LineProps {
  readonly index: number;
  readonly content: string;
}

function getCursorPosition(): number | undefined {
  const selection = document.getSelection();
  const range = selection?.getRangeAt(0);
  return range?.startOffset;
}

export default function Line(props: LineProps) {
  const { index, content } = props;
  const length = useSelector(selectLength);
  const cursor = useSelector(selectCursor);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (index === cursor) {
      ref.current?.focus();
    }
  });

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
        dispatch(setLength(length + 1));
        dispatch(moveCursorDown());
      }

      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      dispatch(moveCursorDown());

      e.preventDefault();
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
