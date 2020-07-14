/* eslint-disable @typescript-eslint/quotes */
import {
  BlockType,
  DocumentState,
  BlockState,
} from "../stores/documentState";

export interface ConvertBlockProps {
  readonly id: string;
  readonly type: BlockType;
}

function getBlock(type: BlockType, block: BlockState): BlockState {
  switch (type) {
    case 'text': return {
      ...block,
      type: 'text',
    };
    case 'checkbox': return {
      ...block,
      type: 'checkbox',
      isChecked: false,
    };
    case 'unorderedList': return {
      ...block,
      type: 'unorderedList',
    };
    case 'orderedList': return {
      ...block,
      type: 'orderedList',
    };
    case 'toggleList': return {
      ...block,
      type: 'toggleList',
      showChildren: true,
    };
    default: throw new Error(`Wrong block type: ${type}`);
  }
}

export default function convertBlockReducer(
  state: DocumentState,
  payload: ConvertBlockProps,
): DocumentState {
  const { blocks } = state;
  const { id, type } = payload;

  const block = blocks.byId[id];
  if (block.type === type) {
    return state;
  }

  return {
    ...state,
    blocks: {
      ...blocks,
      byId: {
        ...blocks.byId,
        [id]: {
          ...getBlock(type, block),
        },
      },
    },
  };
}
