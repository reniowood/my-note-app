import React, { useState } from 'react';
import BlockHandler from './BlockHandler';
import styles from './Block.module.css';

interface BlockProps {
  readonly id: string;
  readonly index: number;
}

export default function Block(props: React.PropsWithChildren<BlockProps>) {
  const { id, index, children } = props;

  const [showHandler, setShowHandler] = useState(false);

  return (
    <div
      className={styles.block}
      onMouseEnter={() => setShowHandler(true)}
      onMouseLeave={() => setShowHandler(false)}
    >
      <BlockHandler id={id} index={index} enabled={showHandler} />
      {children}
    </div>
  );
}
