import React from 'react';
import Text from '../text/Text';
import Block from './Block';
import { UnorderedListBlockState } from '../document/stores/documentState';
import styles from './UnorderedListBlock.module.css';

interface UnorderedListBlockProps {
  readonly index: number;
  readonly block: UnorderedListBlockState;
}

export default function UnorderedListBlock(props: UnorderedListBlockProps) {
  const { index, block } = props;

  return (
    <Block id={block.id} index={index}>
      <div className={styles.bullet}>•</div>
      <Text id={block.id} index={index} content={block.content} />
    </Block>
  );
}
