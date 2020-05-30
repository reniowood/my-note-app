import React from 'react';
import { TextBlockState } from '../document/documentSlice';
import Text from '../text/Text';
import Block from './Block';

interface TextBlockProps {
  readonly id: string;
  readonly index: number;
  readonly block: TextBlockState;
}

export default function TextBlock(props: TextBlockProps) {
  const { id, index, block } = props;

  return (
    <Block id={id}>
      <Text id={id} index={index} content={block.content} />
    </Block>
  );
}
