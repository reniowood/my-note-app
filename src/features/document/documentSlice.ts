import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DocumentState {
  readonly lines: string[];
}

interface AddLineActionPayload {
  readonly index: number;
  readonly content: string;
}

const initialState: DocumentState = {
  lines: ['test'],
};

export const documentState = createSlice({
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
  },
});

export const { addLine } = documentState.actions;

export const selectLines = (state: { document: DocumentState }) => state.document.lines;

export default documentState.reducer;
