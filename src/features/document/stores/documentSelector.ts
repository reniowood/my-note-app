import { RootState } from '../../../app/store';

export const selectBlocks = (state: RootState) => state.blocks;
export const selectCursor = (state: RootState) => state.cursor;
export const selectPreviousBlock = (index: number) => (state: RootState) => {
  if (index > 0 && index < state.blocks.all.length) {
    return state.blocks.byId[state.blocks.all[index - 1]];
  }

  return null;
};
