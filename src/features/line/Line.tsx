import React from 'react';
import { useDispatch } from 'react-redux';
import { addLine } from '../document/documentSlice';

interface LineProps {
  readonly index: number;
  readonly content: string;
}

export function Line(props: LineProps) {
  const { index, content } = props;
  const dispatch = useDispatch();

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      dispatch(addLine({
        index,
        content: ''
      }));
      e.preventDefault();
    }
  };

  return (
    <li>
      <div contentEditable="true" onKeyDown={(e) => onKeyDown(e)}>
        {content}
      </div>
    </li>
  );
}