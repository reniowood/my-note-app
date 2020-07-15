import React from 'react';
import { useSelector } from 'react-redux';
import { BlockState, BlocksState } from '../stores/documentState';
import TextBlock from '../block/TextBlock';
import { selectBlocks } from '../stores/documentSelector';
import CheckboxBlock from '../block/CheckboxBlock';
import styles from './Component.module.css';
import UnorderedListBlock from '../block/UnorderedListBlock';
import OrderedListBlock from '../block/OrderedListBlock';
import ToggleListBlock from '../block/ToggleListBlock';
import HeadingBlock from '../block/HeadingBlock';

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

  if (block.type === 'orderedList') {
    return (
      <OrderedListBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  if (block.type === 'toggleList') {
    return (
      <ToggleListBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  if (block.type === 'heading1' || block.type === 'heading2' || block.type === 'heading3') {
    return (
      <HeadingBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  if (block.type === 'text') {
    return (
      <TextBlock
        key={block.id}
        index={index}
        block={block}
      />
    );
  }

  return null;
}

function showChildren(block: BlockState) {
  return block.type !== 'toggleList' || block.showChildren;
}

function getBlockChildren(block: BlockState, blocks: BlocksState) {
  return showChildren(block) && block
    .children
    .map((id) => (
      <Component
        key={id}
        index={blocks.all.indexOf(id)}
        block={blocks.byId[id]}
      />
    ));
}

export default function Component(props: ComponentProps) {
  const { index, block } = props;
  const blocks = useSelector(selectBlocks);

  return (
    <div className={styles.component}>
      {getBlock(index, block)}
      <div className={styles.componentChildren}>
        {getBlockChildren(block, blocks)}
      </div>
    </div>
  );
}
