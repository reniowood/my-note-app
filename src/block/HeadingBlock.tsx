import React from 'react';
import { useDispatch } from 'react-redux';
import Block from './Block';
import Text from '../text/Text';
import { convertBlock } from '../stores/documentSlice';
import styles from './HeadingBlock.module.css';
import { HeadingBlockState } from '../stores/documentState';

export interface HeadingBlockProps {
  readonly index: number;
  readonly block: HeadingBlockState;
}

export default function HeadingBlock(props: HeadingBlockProps) {
  const { index, block } = props;
  const { id } = block;
  const dispatch = useDispatch();

  const onBackspaceKeyDown = () => {
    dispatch(convertBlock({
      id,
      type: 'text',
    }));
  };

  return (
    <Block id={block.id} index={index}>
      <Text
        id={block.id}
        index={index}
        content={block.content}
        className={styles[block.type]}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
