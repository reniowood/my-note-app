import React from 'react';
import { useSelector } from 'react-redux';
import { BlockState, TextBlockState } from '../document/documentState';
import TextBlock from '../block/TextBlock';
import { selectBlocks } from '../document/documentSelector';

interface ComponentProps {
  readonly index: number;
  readonly block: BlockState;
}

function getBlock(index: number, block: BlockState) {
  if ((block as TextBlockState).content !== undefined) {
    return (
      <TextBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  return (
    <TextBlock
      key={block.id}
      index={index}
      block={block}
    />
  );
}

export default function Component(props: ComponentProps) {
  const { index, block } = props;
  const blocks = useSelector(selectBlocks);

  return (
    <li>
      {getBlock(index, block)}
      <ul>
        {
          block
            .children
            .map((id) => (
              <Component
                index={blocks.all.indexOf(id)}
                block={blocks.byId[id]}
              />
            ))
        }
      </ul>
    </li>
  );
}
