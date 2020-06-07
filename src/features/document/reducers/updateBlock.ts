import { DocumentState } from '../documentState';

export interface UpdateBlockPayload {
  readonly id: string;
  readonly content: string;
}

export default function updateBlockReducer(
  state: DocumentState,
  payload: UpdateBlockPayload,
) {
  const { blocks } = state;
  const { id, content } = payload;

  return {
    ...state,
    blocks: {
      ...blocks,
      byId: {
        ...blocks.byId,
        [id]: {
          ...blocks.byId[id],
          content,
        },
      },
    },
  };
}
