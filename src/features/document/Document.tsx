import React from 'react';
import { useSelector } from 'react-redux';
import { selectBlocks } from './stores/documentSelector';
import Component from '../component/Component';
import styles from './Document.module.css';

export default function Document() {
  const blocks = useSelector(selectBlocks);
  const rootBlocks = blocks.all.filter((blockId) => blocks.byId[blockId].parent === null);

  return (
    <ul className={`${styles.document}`}>
      {
        rootBlocks.map((id) => (
          <Component
            key={id}
            index={blocks.all.indexOf(id)}
            block={blocks.byId[id]}
          />
        ))
      }
    </ul>
  );
}
