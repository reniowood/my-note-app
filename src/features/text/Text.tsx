import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlockNextTo,
  updateBlock,
  moveCursorDown,
  moveCursorUp,
  setCursorRow,
  indent,
  outdent,
  setCursorColumn,
  mergeWithPreviousBlock,
} from '../document/documentSlice';
import { selectCursor, selectPreviousBlock } from '../document/documentSelector';
import styles from './Text.module.css';

interface TextProps {
  readonly id: string;
  readonly index: number;
  readonly parentId: string | null;
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
  const {
    id,
    index,
    parentId,
    content,
  } = props;
  const cursor = useSelector(selectCursor);
  const previousBlock = useSelector(selectPreviousBlock(index));
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = content;
      if (index === cursor.row) {
        setCursorPosition(ref.current, cursor.column);
      }
    }
  });

  const updateBlockContent = (element: HTMLElement, column: number) => {
    dispatch(updateBlock({
      id,
      content: element.innerText,
    }));
    dispatch(setCursorRow(index));
    dispatch(setCursorColumn(column));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const element = e.currentTarget;
        updateBlockContent(element, cursorPosition);
        dispatch(updateBlock({
          id,
          content: element.innerText?.substring(0, cursorPosition),
        }));
        dispatch(addBlockNextTo({
          id,
          content: element.innerText?.substring(cursorPosition),
        }));
        dispatch(setCursorRow(index + 1));
      }

      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const element = e.currentTarget;
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const element = e.currentTarget;
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.shiftKey && e.key === 'Tab') {
      const element = e.currentTarget;
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(outdent(id));

      e.preventDefault();
    } else if (e.key === 'Tab') {
      const element = e.currentTarget;
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(indent(id));

      e.preventDefault();
    } else if (e.key === 'Backspace') {
      const element = e.currentTarget;
      const cursorPosition = getCursorPosition();
      if (cursorPosition === 0) {
        updateBlockContent(element, cursorPosition);

        console.log(`${previousBlock?.id}, ${parentId}`);

        if (previousBlock !== null && previousBlock.parent === parentId) {
          dispatch(mergeWithPreviousBlock(id));
        } else {
          dispatch(outdent(id));
        }

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
