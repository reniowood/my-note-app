import React from 'react';
import { useDispatch } from 'react-redux';
import { addBlockNextTo } from '../document/documentSlice';
import styles from './BlockHandler.module.css';

interface BlockHandlerProps {
  readonly id: string;
  readonly enabled: boolean;
}

export default function BlockHandler(props: BlockHandlerProps) {
  const { id, enabled } = props;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(addBlockNextTo({
      id,
      content: '',
    }));
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
        onClick={() => onClick()}
        onKeyDown={() => {}}
      >
        add
      </span>
    </div>
  );
}
