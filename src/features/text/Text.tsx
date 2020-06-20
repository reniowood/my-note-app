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
} from '../document/stores/documentSlice';
import { selectCursor } from '../document/stores/documentSelector';
import styles from './Text.module.css';

type OnKeyDownHandler = (
  e: React.KeyboardEvent<HTMLDivElement>,
  element: HTMLDivElement,
  cursorPosition: number | undefined,
) => void;

interface TextProps {
  readonly id: string;
  readonly index: number;
  readonly content: string;
  readonly onBackspaceKeyDown: OnKeyDownHandler;
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

const Text = (props: TextProps) => {
  const {
    id,
    index,
    content,
    onBackspaceKeyDown,
  } = props;
  const cursor = useSelector(
    selectCursor,
    (prevCursor, nextCursor) => nextCursor.row === prevCursor.row,
  );
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
    dispatch(setCursorRow({
      row: index,
    }));
    dispatch(setCursorColumn({
      column,
    }));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (e.key === 'Enter') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
        dispatch(updateBlock({
          id,
          content: element.innerText?.substring(0, cursorPosition),
        }));
        dispatch(addBlockNextTo({
          id,
          content: element.innerText?.substring(cursorPosition),
        }));
        dispatch(setCursorRow({
          row: index + 1,
        }));
        dispatch(setCursorColumn({
          column: 0,
        }));
      }

      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.shiftKey && e.key === 'Tab') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(outdent({
        id,
      }));

      e.preventDefault();
    } else if (e.key === 'Tab') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        updateBlockContent(element, cursorPosition);
      }
      dispatch(indent({
        id,
      }));

      e.preventDefault();
    } else if (e.key === 'Backspace') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition === 0) {
        updateBlockContent(element, cursorPosition);
        onBackspaceKeyDown(e, element, cursorPosition);
        e.preventDefault();
      }
    }
  };

  const onFocus = () => {
    dispatch(setCursorRow({
      row: index,
    }));
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const cursorPosition = getCursorPosition();
    if (cursorPosition !== undefined) {
      dispatch(updateBlock({
        id,
        content: element.innerText,
      }));
    }
  };

  return (
    <div
      role="row"
      ref={ref}
      contentEditable="true"
      suppressContentEditableWarning
      className={styles.text}
      tabIndex={index}
      onKeyDown={(e) => onKeyDown(e)}
      onFocus={() => onFocus()}
      onBlur={(e) => onBlur(e)}
    >
      {content}
    </div>
  );
};

export default React.memo(Text);
