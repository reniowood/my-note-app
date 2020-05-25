import React from 'react';
import { useSelector } from 'react-redux';
import { selectBlocks, selectCursor } from './documentSelector';
import TextBlock from '../block/TextBlock';
import { TextBlockState } from './documentSlice';

export default function Document() {
  const blocks = useSelector(selectBlocks);
  const cursor = useSelector(selectCursor);

  return (
    <ul>
      {
        blocks.map((block, index) => {
          if ((block as TextBlockState).content !== undefined) {
            return (
              <TextBlock
                key={block.id}
                index={index}
                cursor={cursor}
                block={block}
              />
            );
          }

          return (
            <TextBlock
              key={block.id}
              index={index}
              cursor={cursor}
              block={block}
            />
          );
        })
      }
    </ul>
  );
}
