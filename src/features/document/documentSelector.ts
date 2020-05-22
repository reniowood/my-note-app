import { RootState } from '../../app/store';

export const selectLines = (state: RootState) => state.document.lines;
