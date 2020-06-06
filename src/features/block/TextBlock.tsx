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
    <Block id={block.id}>
      <Text id={block.id} index={index} parentId={block.parent} content={block.content} />
    </Block>
  );
}
