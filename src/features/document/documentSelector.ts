import { RootState } from '../../app/store';

export const selectLines = (state: RootState) => state.lines;
export const selectCursor = (state: RootState) => state.cursor;
