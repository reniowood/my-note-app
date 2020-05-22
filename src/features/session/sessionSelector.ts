import { RootState } from '../../app/store';

export const selectCursor = (state: RootState) => state.session.cursor;
export const selectLength = (state: RootState) => state.session.length;
