import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, DocumentState } from './documentState';
import addBlockNextToReducer from '../reducers/addBlockNextTo';
import updateBlockReducer from '../reducers/updateBlock';
import moveCursorUpReducer from '../reducers/moveCursorUp';
import moveCursorDownReducer from '../reducers/moveCursorDown';
import setCursorRowReducer from '../reducers/setCursorRow';
import setCursorColumnReducer from '../reducers/setCursorColumn';
import indentReducer from '../reducers/indent';
import outdentReducer from '../reducers/outdent';
import mergeWithPreviousBlockReducer from '../reducers/mergeWithPreviousBlock';
import checkCheckboxBlockReducer from '../reducers/checkCheckboxBlock';
import uncheckCheckboxBlockReducer from '../reducers/uncheckCheckboxBlock';
import mergeOrOutdentReducer from '../reducers/mergeOrOutdent';
import setCursorLastRowReducer from '../reducers/setCursorLastRow';
import turnOnToggleListBlockReducer from '../reducers/turnOnToggleListBlock';
import turnOffToggleListBlockReducer from '../reducers/turnOffToggleListBlock';
import convertBlockReducer from '../reducers/convertBlock';

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
    setCursorLastRow: setCursorLastRowReducer,
    indent: convert(indentReducer),
    outdent: convert(outdentReducer),
    mergeWithPreviousBlock: convert(mergeWithPreviousBlockReducer),
    mergeOrOutdent: convert(mergeOrOutdentReducer),
    checkCheckboxBlock: convert(checkCheckboxBlockReducer),
    uncheckCheckboxBlock: convert(uncheckCheckboxBlockReducer),
    turnOnToggleListBlock: convert(turnOnToggleListBlockReducer),
    turnOffToggleListBlock: convert(turnOffToggleListBlockReducer),
    convertBlock: convert(convertBlockReducer),
  },
});

export const {
  addBlockNextTo,
  updateBlock,
  moveCursorUp,
  moveCursorDown,
  setCursorRow,
  setCursorColumn,
  setCursorLastRow,
  indent,
  outdent,
  mergeWithPreviousBlock,
  mergeOrOutdent,
  checkCheckboxBlock,
  uncheckCheckboxBlock,
  turnOnToggleListBlock,
  turnOffToggleListBlock,
  convertBlock,
} = documentSlice.actions;

export default documentSlice.reducer;
