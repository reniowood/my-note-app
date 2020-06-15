import React from 'react';
import Text from '../text/Text';
import Block from './Block';
import { TextBlockState } from '../document/stores/documentState';

interface TextBlockProps {
  readonly index: number;
  readonly block: TextBlockState;
}

export default function TextBlock(props: TextBlockProps) {
  const { index, block } = props;

  return (
    <Block id={block.id} index={index}>
      <Text id={block.id} index={index} content={block.content} />
    </Block>
  );
}
