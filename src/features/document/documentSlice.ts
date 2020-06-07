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
    moveCursorUp: convert(moveCursorUpReducer),
    moveCursorDown: convert(moveCursorDownReducer),
    setCursorRow: convert(setCursorRowReducer),
    setCursorColumn: convert(setCursorColumnReducer),
    indent: convert(indentReducer),
    outdent: convert(outdentReducer),
    mergeWithPreviousBlock: convert(mergeWithPreviousBlockReducer),
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
} = documentSlice.actions;

export default documentSlice.reducer;
