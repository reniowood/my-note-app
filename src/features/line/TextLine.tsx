import React from 'react';
import { CursorState, TextLineState } from '../document/documentSlice';
import Text from '../text/Text';

interface TextLineProps {
  readonly index: number;
  readonly cursor: CursorState;
  readonly line: TextLineState;
}

export default function TextLine(props: TextLineProps) {
  const { index, cursor, line } = props;

  return (
    <li>
      <Text index={index} cursor={cursor} content={line.content} />
    </li>
  );
}
