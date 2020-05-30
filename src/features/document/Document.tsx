import React from 'react';
import { useSelector } from 'react-redux';
import { selectBlocks } from './documentSelector';
import TextBlock from '../block/TextBlock';
import { TextBlockState } from './documentSlice';

export default function Document() {
  const blocks = useSelector(selectBlocks);

  return (
    <ul>
      {
        blocks.all.map((id, index) => {
          const block = blocks.byId[id];
          if ((block as TextBlockState).content !== undefined) {
            return (
              <TextBlock
                key={block.id}
                id={id}
                index={index}
                block={block}
              />
            );
          }

          return (
            <TextBlock
              key={block.id}
              id={id}
              index={index}
              block={block}
            />
          );
        })
      }
    </ul>
  );
}
