import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFocusedBlock } from '../stores/documentSelector';
import styles from './ToolboxBlockTypeButton.module.css';
import { BlockType } from '../stores/documentState';
import { convertBlock } from '../stores/documentSlice';

interface ToolboxBlockTypeButtonProps {
  readonly blockType: BlockType;
  readonly materialIconName: string;
}

export default function ToolboxBlockTypeButton(props: ToolboxBlockTypeButtonProps) {
  const { blockType, materialIconName } = props;
  const block = useSelector(selectFocusedBlock);
  const dispatch = useDispatch();

  const onClick = () => {
    if (block.type === blockType) {
      dispatch(convertBlock({
        id: block.id,
        type: 'text',
      }));
    } else {
      dispatch(convertBlock({
        id: block.id,
        type: blockType,
      }));
    }
  };

  const isSelected = (value: BlockType) => {
    if (value === block.type) {
      return styles.selectedButton;
    }

    return '';
  };

  return (
    <button
      type="button"
      className={`${styles.button} material-icons ${isSelected(blockType)}`}
      onClick={onClick}
    >
      {materialIconName}
    </button>
  );
}
