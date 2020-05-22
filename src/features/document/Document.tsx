import React from 'react';
import { useSelector } from 'react-redux';
import { selectLines } from './documentSelector';
import Line from '../line/Line';

export default function Document() {
  const lines = useSelector(selectLines);

  return (
    <ul>
      {
        lines.map((content, index) => <Line index={index} content={content} />)
      }
    </ul>
  );
}
