import { RootState } from '../../app/store';

export const selectBlocks = (state: RootState) => state.blocks;
export const selectCursor = (state: RootState) => state.cursor;
