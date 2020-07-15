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
} from '../stores/documentSlice';
import { selectCursor } from '../stores/documentSelector';
import styles from './Text.module.css';
import { setCursorPosition, getCursorPosition } from './TextService';

type OnKeyDownHandler = (
  e: React.KeyboardEvent<HTMLDivElement>,
  element: HTMLDivElement,
  cursorPosition: number | undefined,
) => void;

interface TextProps {
  readonly id: string;
  readonly index: number;
  readonly content: string;
  readonly className?: string;
  readonly onBackspaceKeyDown: OnKeyDownHandler;
}

const Text = (props: TextProps) => {
  const {
    id,
    index,
    content,
    className,
    onBackspaceKeyDown,
  } = props;
  const cursor = useSelector(selectCursor);
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
        const [start, end] = cursorPosition;
        updateBlockContent(element, start);
        dispatch(updateBlock({
          id,
          content: element.innerText?.substring(0, start),
        }));
        dispatch(addBlockNextTo({
          id,
          content: element.innerText?.substring(end),
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
        const [start] = cursorPosition;
        updateBlockContent(element, start);
      }
      dispatch(moveCursorUp());

      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const [start] = cursorPosition;
        updateBlockContent(element, start);
      }
      dispatch(moveCursorDown());

      e.preventDefault();
    } else if (e.shiftKey && e.key === 'Tab') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const [start] = cursorPosition;
        updateBlockContent(element, start);
      }
      dispatch(outdent({
        id,
      }));

      e.preventDefault();
    } else if (e.key === 'Tab') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const [start] = cursorPosition;
        updateBlockContent(element, start);
      }
      dispatch(indent({
        id,
      }));

      e.preventDefault();
    } else if (e.key === 'Backspace') {
      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const [start, end] = cursorPosition;
        if (start === 0 && end === 0) {
          updateBlockContent(element, start);
          onBackspaceKeyDown(e, element, start);
          e.preventDefault();
        }
      }
    }
  };

  const onFocus = () => {
    if (cursor.row !== index) {
      dispatch(setCursorRow({
        row: index,
      }));

      const cursorPosition = getCursorPosition();
      if (cursorPosition !== undefined) {
        const [start] = cursorPosition;
        dispatch(setCursorColumn({
          column: start,
        }));
      }
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    dispatch(updateBlock({
      id,
      content: element.innerText,
    }));
  };

  return (
    <div
      role="row"
      ref={ref}
      contentEditable="true"
      suppressContentEditableWarning
      className={className ? `${className} ${styles.text}` : styles.text}
      tabIndex={index}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {content}
    </div>
  );
};

function arePropsEqual(prevProps: TextProps, nextProps: TextProps) {
  return prevProps.id === nextProps.id
    && prevProps.index === nextProps.index
    && prevProps.content === nextProps.content
    && prevProps.className === nextProps.className;
}

export default React.memo(Text, arePropsEqual);
