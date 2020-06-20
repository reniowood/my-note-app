import React from 'react';
import { useDispatch } from 'react-redux';
import Text from '../text/Text';
import Block from './Block';
import { TextBlockState } from '../document/stores/documentState';
import { mergeOrOutdent } from '../document/stores/documentSlice';

interface TextBlockProps {
  readonly index: number;
  readonly block: TextBlockState;
}

export default function TextBlock(props: TextBlockProps) {
  const { index, block } = props;
  const { id } = block;
  const dispatch = useDispatch();

  const onBackspaceKeyDown = () => {
    dispatch(mergeOrOutdent({
      id,
    }));
  };

  return (
    <Block id={block.id} index={index}>
      <Text
        id={block.id}
        index={index}
        content={block.content}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
