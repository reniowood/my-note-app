import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, DocumentState } from './documentState';
import addBlockNextToReducer from './reducers/addBlockNextTo';
import updateBlockReducer from './reducers/updateBlock';
import moveCursorUpReducer from './reducers/moveCursorUp';
import moveCursorDownReducer from './reducers/moveCursorDown';
import setCursorRowReducer from './reducers/setCursorRow';
import setCursorColumnReducer from './reducers/setCursorColumn';
import indentReducer from './reducers/indent';
import outdentReducer from './reducers/outdent';
import mergeWithPreviousBlockReducer from './reducers/mergeWithPreviousBlock';
import checkCheckboxBlockReducer from './reducers/checkCheckboxBlock';
import uncheckCheckboxBlockReducer from './reducers/uncheckCheckboxBlock';
import convertBlockToCheckboxBlockReducer from './reducers/convertBlockToCheckboxBlock';
import convertBlockToTextBlockReducer from './reducers/convertBlockToTextBlock';

type Reducer<T> = (state: DocumentState, payload: T) => DocumentState;
type ReducerWithAction<T> = (state: DocumentState, action: PayloadAction<T>) => DocumentState;

function convert<T>(r: Reducer<T>): ReducerWithAction<T> {
  return (state: DocumentState, action: PayloadAction<T>) => r(state, action.payload);
}

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addBlockNextTo: convert(addBlockNextToReducer),
    updateBlock: convert(updateBlockReducer),
    moveCursorUp: moveCursorUpReducer,
    moveCursorDown: moveCursorDownReducer,
    setCursorRow: convert(setCursorRowReducer),
    setCursorColumn: convert(setCursorColumnReducer),
    indent: convert(indentReducer),
    outdent: convert(outdentReducer),
    mergeWithPreviousBlock: convert(mergeWithPreviousBlockReducer),
    checkCheckboxBlock: convert(checkCheckboxBlockReducer),
    uncheckCheckboxBlock: convert(uncheckCheckboxBlockReducer),
    convertBlockToCheckboxBlock: convert(convertBlockToCheckboxBlockReducer),
    convertBlockToTextBlock: convert(convertBlockToTextBlockReducer),
  },
});

export const {
  addBlockNextTo,
  updateBlock,
  moveCursorUp,
  moveCursorDown,
  setCursorRow,
  setCursorColumn,
  indent,
  outdent,
  mergeWithPreviousBlock,
  checkCheckboxBlock,
  uncheckCheckboxBlock,
  convertBlockToCheckboxBlock,
  convertBlockToTextBlock,
} = documentSlice.actions;

export default documentSlice.reducer;
