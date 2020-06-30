import React from 'react';
import { useDispatch } from 'react-redux';
import Text from '../text/Text';
import Block from './Block';
import { UnorderedListBlockState } from '../stores/documentState';
import styles from './UnorderedListBlock.module.css';
import { convertBlockToTextBlock } from '../stores/documentSlice';

interface UnorderedListBlockProps {
  readonly index: number;
  readonly block: UnorderedListBlockState;
}

export default function UnorderedListBlock(props: UnorderedListBlockProps) {
  const { index, block } = props;
  const { id } = block;
  const dispatch = useDispatch();

  const onBackspaceKeyDown = () => {
    dispatch(convertBlockToTextBlock({
      id,
    }));
  };

  return (
    <Block id={block.id} index={index}>
      <div className={styles.bullet}>•</div>
      <Text
        id={block.id}
        index={index}
        content={block.content}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
