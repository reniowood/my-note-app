import React from 'react';
import { useDispatch } from 'react-redux';
import { addBlock } from '../document/documentSlice';
import styles from './BlockHandler.module.css';

interface BlockHandlerProps {
  readonly index: number;
  readonly enabled: boolean;
}

export default function BlockHandler(props: BlockHandlerProps) {
  const { index, enabled } = props;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(addBlock({
      index,
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
