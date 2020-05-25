import React from 'react';
import { useSelector } from 'react-redux';
import { selectLines, selectCursor } from './documentSelector';
import TextLine from '../line/TextLine';
import { TextLineState } from './documentSlice';

export default function Document() {
  const lines = useSelector(selectLines);
  const cursor = useSelector(selectCursor);

  return (
    <ul>
      {
        lines.map((line, index) => {
          if ((line as TextLineState).content !== undefined) {
            return (
              <TextLine
                key={line.id}
                index={index}
                cursor={cursor}
                line={line}
              />
            );
          }

          return (
            <TextLine
              key={line.id}
              index={index}
              cursor={cursor}
              line={line}
            />
          );
        })
      }
    </ul>
  );
}
