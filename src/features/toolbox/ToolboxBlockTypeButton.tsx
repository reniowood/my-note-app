import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFocusedBlock } from '../document/stores/documentSelector';
import { convertBlockToTextBlock, convertBlockToCheckboxBlock, convertBlockToUnorderedListBlock } from '../document/stores/documentSlice';
import styles from './ToolboxBlockTypeButton.module.css';

interface ToolboxBlockTypeButtonProps {
  readonly blockType: 'text' | 'unorderedList' | 'checkbox';
  readonly materialIconName: string;
}

function getConverter(type: string) {
  switch (type) {
    case 'text': return convertBlockToTextBlock;
    case 'checkbox': return convertBlockToCheckboxBlock;
    case 'unorderedList': return convertBlockToUnorderedListBlock;
    default: return null;
  }
}

export default function ToolboxBlockTypeButton(props: ToolboxBlockTypeButtonProps) {
  const { blockType, materialIconName } = props;
  const block = useSelector(selectFocusedBlock);
  const dispatch = useDispatch();

  const onClick = (value: 'text' | 'unorderedList' | 'checkbox') => () => {
    const converter = getConverter(value);
    if (converter) {
      dispatch(converter({
        id: block.id,
      }));
    }
  };

  const isSelected = (value: 'text' | 'unorderedList' | 'checkbox') => {
    if (value === block.type) {
      return styles.selectedButton;
    }

    return '';
  };

  return (
    <button
      type="button"
      className={`${styles.button} material-icons ${isSelected(blockType)}`}
      onClick={onClick(blockType)}
    >
      {materialIconName}
    </button>
  );
}
