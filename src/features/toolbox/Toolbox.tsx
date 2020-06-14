import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFocusedBlock } from '../document/stores/documentSelector';
import { convertBlockToCheckboxBlock, convertBlockToTextBlock } from '../document/stores/documentSlice';

export default function Toolbox() {
  const block = useSelector(selectFocusedBlock);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.value === 'text') {
      dispatch(convertBlockToTextBlock({
        id: block.id,
      }));
    } else if (target.value === 'checkbox') {
      dispatch(convertBlockToCheckboxBlock({
        id: block.id,
      }));
    }
  };

  return (
    <div>
      <label htmlFor="block-type-text">
        <input
          type="radio"
          id="block-type-text"
          name="block-type"
          value="text"
          onChange={(e) => onChange(e)}
          checked={block.type === 'text'}
        />
        Text
      </label>
      <label htmlFor="block-type-checkbox">
        <input
          type="radio"
          id="block-type-checkbox"
          name="block-type"
          value="checkbox"
          onChange={(e) => onChange(e)}
          checked={block.type === 'checkbox'}
        />
        Checkbox
      </label>
    </div>
  );
}