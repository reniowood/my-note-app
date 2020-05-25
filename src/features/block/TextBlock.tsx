import React from 'react';
import { CursorState, TextBlockState } from '../document/documentSlice';
import Text from '../text/Text';

interface TextBlockProps {
  readonly index: number;
  readonly cursor: CursorState;
  readonly block: TextBlockState;
}

export default function TextBlock(props: TextBlockProps) {
  const { index, cursor, block } = props;

  return (
    <li>
      <Text index={index} cursor={cursor} content={block.content} />
    </li>
  );
}
