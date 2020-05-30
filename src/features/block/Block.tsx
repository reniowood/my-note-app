import React, { useState } from 'react';
import BlockHandler from './BlockHandler';
import styles from './Block.module.css';

interface BlockProps {
  readonly id: string;
}

export default function Block(props: React.PropsWithChildren<BlockProps>) {
  const { id, children } = props;

  const [showHandler, setShowHandler] = useState(false);

  return (
    <div
      className={styles.block}
      onMouseEnter={() => setShowHandler(true)}
      onMouseLeave={() => setShowHandler(false)}
    >
      <BlockHandler id={id} enabled={showHandler} />
      { children }
    </div>
  );
}
