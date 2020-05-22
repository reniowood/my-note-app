import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  readonly lines: string[];
}

interface AddLineActionPayload {
  readonly index: number;
  readonly content: string;
}

interface UpdateLineActionPayload {
  readonly index: number;
  readonly content: string;
}

const initialState: DocumentState = {
  lines: ['test'],
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addLine: (state: DocumentState, action: PayloadAction<AddLineActionPayload>) => {
      const { lines } = state;
      const { index, content } = action.payload;

      return {
        lines: [
          ...lines.slice(0, index + 1),
          content,
          ...lines.slice(index + 1),
        ],
      };
    },
    updateLine: (state: DocumentState, action: PayloadAction<UpdateLineActionPayload>) => {
      const { lines } = state;
      const { index, content } = action.payload;

      return {
        lines: [
          ...lines.slice(0, index),
          content,
          ...lines.slice(index + 1),
        ],
      };
    },
  },
});

export const { addLine, updateLine } = documentSlice.actions;

export default documentSlice.reducer;
