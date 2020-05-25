import React from 'react';
import BlockHandler from './BlockHandler';
import styles from './Block.module.css';

interface BlockProps {
  readonly index: number;
}

export default function Block(props: React.PropsWithChildren<BlockProps>) {
  const { index, children } = props;

  return (
    <div className={styles.block}>
      <BlockHandler index={index} />
      { children }
    </div>
  );
}
