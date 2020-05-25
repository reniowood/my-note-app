import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlock, updateBlock, mergeBlock, moveCursorDown, moveCursorUp,
} from '../document/documentSlice';
import { selectCursor } from '../document/documentSelector';
import styles from './Text.module.css';

interface TextProps {
  readonly index: number;
  readonly content: string;
}

function getCursorPosition(): number | undefined {
  const selection = document.getSelection();
  const range = selection?.getRangeAt(0);
  return range?.startOffset;
}

function setCursorPosition(element: HTMLElement, position: number) {
  const range = document.createRange();
  if (element.firstChild) {
    range.setStart(element.firstChild, position);
    range.collapse(true);
  }

  const selection = document.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  element.focus();
}

export default function Text(props: TextProps) {
  const { index, content } = props;
  const cursor = useSelector(selectCursor);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (index === cursor.row) {
      if (ref.current) {
        setCursorPosition(ref.current, cursor.column);
      }
    }
  });

  const updateBlockContent = (element: HTMLElement) => {
    dispatch(updateBlock({
      index,
      content: element.innerText,
    }));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const element = e.currentTarget;
        dispatch(updateBlock({
          index,
          content: element.innerText?.substring(0, cursorPosition),
        }));
        dispatch(addBlock({
          index,
          content: element.innerText?.substring(cursorPosition),
        }));
      }

      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const element = e.currentTarget;
      updateBlockContent(element);
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const element = e.currentTarget;
      updateBlockContent(element);
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.key === 'Backspace') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition === 0 && index > 0) {
        const element = e.currentTarget;
        updateBlockContent(element);
        dispatch(mergeBlock({
          from: index,
          to: index - 1,
        }));

        e.preventDefault();
      }
    }
  };

  return (
    <div role="row" ref={ref} contentEditable="true" className={styles.text} tabIndex={index} onKeyDown={(e) => onKeyDown(e)}>
      {content}
    </div>
  );
}
