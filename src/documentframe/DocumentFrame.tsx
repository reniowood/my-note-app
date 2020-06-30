import React from 'react';
import { useDispatch } from 'react-redux';
import Document from '../document/Document';
import styles from './DocumentFrame.module.css';
import { setCursorLastRow } from '../stores/documentSlice';

export default function DocumentFrame() {
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.target as Node)) {
      dispatch(setCursorLastRow());
    }
  };

  return (
    <div className={styles.frame} onClick={onClick}>
      <div ref={ref}>
        <Document />
      </div>
    </div>
  );
}
