import React from 'react';
import { useDispatch } from 'react-redux';
import Text from '../text/Text';
import Block from './Block';
import { CheckboxBlockState } from '../document/stores/documentState';
import { checkCheckboxBlock, uncheckCheckboxBlock, convertBlockToTextBlock } from '../document/stores/documentSlice';

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

  const onBackspaceKeyDown = () => {
    dispatch(convertBlockToTextBlock({
      id,
    }));
  };

  return (
    <Block id={block.id} index={index}>
      <input type="checkbox" checked={block.isChecked} onChange={(e) => handleOnChange(e)} />
      <Text
        id={block.id}
        index={index}
        content={block.content}
        onBackspaceKeyDown={onBackspaceKeyDown}
      />
    </Block>
  );
}
