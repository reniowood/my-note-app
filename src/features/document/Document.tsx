import React from 'react';
import { useSelector } from 'react-redux';
import { selectLines, selectCursor } from './documentSelector';
import Line from '../line/Line';

export default function Document() {
  const lines = useSelector(selectLines);
  const cursor = useSelector(selectCursor);

  return (
    <ul>
      {
        lines.map((line, index) => (
          <Line
            key={line.id}
            index={index}
            cursor={cursor}
            line={line}
          />
        ))
      }
    </ul>
  );
}
