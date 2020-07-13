import React from 'react';
import { useDispatch } from 'react-redux';
import { ToggleListBlockState } from '../stores/documentState';
import Block from './Block';
import Text from '../text/Text';
import { turnOffToggleListBlock, turnOnToggleListBlock, convertBlockToTextBlock } from '../stores/documentSlice';
import styles from './ToggleListBlock.module.css';

export interface ToggleListBlockProps {
  readonly index: number;
  readonly block: ToggleListBlockState;
}

export default function ToggleListBlock(props: ToggleListBlockProps) {
  const { index, block } = props;
  const { id, showChildren } = block;
  const dispatch = useDispatch();

  const onClick = () => {
    if (showChildren) {
      dispatch(turnOffToggleListBlock({
        id,
      }));
    } else {
      dispatch(turnOnToggleListBlock({
        id,
      }));
    }
  };

  const onBackspaceKeyDown = () => {
    dispatch(convertBlockToTextBlock({
      id,
    }));
  };

  return (
    <Block id={block.id} index={index}>
      <div className={styles.toggleButton} onClick={onClick}>{showChildren ? '▼' : '▶'}</div>
      <Text
        id={block.id}
        index={index}
        content={block.content}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
