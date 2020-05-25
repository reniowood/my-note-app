import React from 'react';
import { TextBlockState } from '../document/documentSlice';
import Text from '../text/Text';
import Block from './Block';

interface TextBlockProps {
  readonly index: number;
  readonly block: TextBlockState;
}

export default function TextBlock(props: TextBlockProps) {
  const { index, block } = props;

  return (
    <Block index={index}>
      <Text index={index} content={block.content} />
    </Block>
  );
}
