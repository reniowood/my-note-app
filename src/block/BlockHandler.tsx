import React from 'react';
import { useDispatch } from 'react-redux';
import { addBlockNextTo, setCursorRow, setCursorColumn } from '../stores/documentSlice';
import styles from './BlockHandler.module.css';

interface BlockHandlerProps {
  readonly id: string;
  readonly index: number;
  readonly enabled: boolean;
}

export default function BlockHandler(props: BlockHandlerProps) {
  const { id, index, enabled } = props;
  const dispatch = useDispatch();

  const addNewBlock = () => {
    dispatch(addBlockNextTo({
      id,
      content: '',
    }));
    dispatch(setCursorRow({
      row: index + 1,
    }));
    dispatch(setCursorColumn({
      column: 0,
    }));
  };

  const onClick = () => {
    addNewBlock();
  };

  const onKeyDown = () => {
    addNewBlock();
  };

  return (
    <div style={{
      visibility: enabled ? 'visible' : 'hidden',
    }}
    >
      <span
        role="button"
        tabIndex={-1}
        className={`${styles.addButton} material-icons`}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        add
      </span>
    </div>
  );
}
