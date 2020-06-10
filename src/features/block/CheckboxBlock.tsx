import React from 'react';
import { useDispatch } from 'react-redux';
import Text from '../text/Text';
import Block from './Block';
import { CheckboxBlockState } from '../document/documentState';
import { checkCheckboxBlock, uncheckCheckboxBlock } from '../document/documentSlice';

interface CheckboxBlockProps {
  readonly index: number;
  readonly block: CheckboxBlockState;
}

export default function CheckboxBlock(props: CheckboxBlockProps) {
  const { index, block } = props;
  const { id } = block;
  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.checked) {
      dispatch(checkCheckboxBlock({ id }));
    } else {
      dispatch(uncheckCheckboxBlock({ id }));
    }
  };

  return (
    <Block id={block.id} index={index}>
      <input type="checkbox" checked={block.isChecked} onChange={(e) => handleOnChange(e)} />
      <Text id={block.id} index={index} parentId={block.parent} content={block.content} />
    </Block>
  );
}
