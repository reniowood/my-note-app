import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLine } from '../document/documentSlice';
import { moveCursorDown, setLength, selectLength, selectCursor, moveCursorUp } from '../session/sessionSlice';

interface LineProps {
  readonly index: number;
  readonly content: string;
}

export function Line(props: LineProps) {
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
    if (e.key === "Enter") {
      dispatch(addLine({
        index,
        content: ''
      }));
      dispatch(setLength(length + 1));
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      dispatch(moveCursorDown());

      e.preventDefault();
    }
  };

  return (
    <li>
      <div ref={ref} contentEditable="true" onKeyDown={(e) => onKeyDown(e)}>
        {content}
      </div>
    </li>
  );
}