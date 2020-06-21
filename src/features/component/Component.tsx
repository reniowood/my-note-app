import React from 'react';
import { useSelector } from 'react-redux';
import { BlockState } from '../document/stores/documentState';
import TextBlock from '../block/TextBlock';
import { selectBlocks } from '../document/stores/documentSelector';
import CheckboxBlock from '../block/CheckboxBlock';
import styles from './Component.module.css';
import UnorderedListBlock from '../block/UnorderedListBlock';

interface ComponentProps {
  readonly index: number;
  readonly block: BlockState;
}

function getBlock(index: number, block: BlockState) {
  if (block.type === 'checkbox') {
    return (
      <CheckboxBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  if (block.type === 'unorderedList') {
    return (
      <UnorderedListBlock
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
    <div className={styles.component}>
      {getBlock(index, block)}
      <div className={styles.componentChildren}>
        {
          block
            .children
            .map((id) => (
              <Component
                key={id}
                index={blocks.all.indexOf(id)}
                block={blocks.byId[id]}
              />
            ))
        }
      </div>
    </div>
  );
}
