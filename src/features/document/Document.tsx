import React from 'react';
import { useSelector } from 'react-redux';
import { selectBlocks } from './stores/documentSelector';
import Component from '../component/Component';

export default function Document() {
  const blocks = useSelector(selectBlocks);
  const rootBlocks = blocks.all.filter((blockId) => blocks.byId[blockId].parent === null);

  return (
    <ul>
      {
        rootBlocks.map((id) => (
          <Component
            index={blocks.all.indexOf(id)}
            block={blocks.byId[id]}
          />
        ))
      }
    </ul>
  );
}
