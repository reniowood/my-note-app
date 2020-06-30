import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  OrderedListBlockState,
  BlocksState,
  BlockState,
  BlockId,
} from '../stores/documentState';
import { convertBlockToTextBlock } from '../stores/documentSlice';
import Text from '../text/Text';
import Block from './Block';
import { selectBlocks } from '../stores/documentSelector';
import styles from './OrderedListBlock.module.css';

interface OrderedListBlockProps {
  readonly index: number;
  readonly block: OrderedListBlockState;
}

function getSiblings(blocks: BlocksState, block: BlockState): BlockState[] {
  if (block.parent === null) {
    return blocks.all.filter((id) => blocks.byId[id].parent === null).map((id) => blocks.byId[id]);
  }

  return blocks.byId[block.parent].children.map((id) => blocks.byId[id]);
}

function getPrecedents(blocks: BlockState[], block: BlockState): BlockState[] {
  const ids = blocks.map((b) => b.id);
  return blocks.filter((_, index) => index <= ids.indexOf(block.id));
}

function getAdjacentOrderedListIds(blocks: BlockState[], target: BlockState): BlockId[] {
  return blocks.reduce((ids, block) => {
    if (block.id === target.id || block.type === 'orderedList') {
      return [...ids, block.id];
    }
    return [];
  }, [] as BlockId[]);
}

function getOrder(blocks: BlocksState, block: BlockState): number {
  const siblings = getSiblings(blocks, block);
  const precedents = getPrecedents(siblings, block);
  const adjacentPrecedentOrderedListIds = getAdjacentOrderedListIds(precedents, block);
  return adjacentPrecedentOrderedListIds.indexOf(block.id);
}

export default function OrderedListBlock(props: OrderedListBlockProps) {
  const { index, block } = props;
  const { id } = block;
  const dispatch = useDispatch();
  const blocks = useSelector(selectBlocks);

  const onBackspaceKeyDown = () => {
    dispatch(convertBlockToTextBlock({
      id,
    }));
  };

  const order = getOrder(blocks, block);

  return (
    <Block id={block.id} index={index}>
      <div className={styles.bullet}>
        {order + 1}
        .
      </div>
      <Text
        id={block.id}
        index={index}
        content={block.content}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
