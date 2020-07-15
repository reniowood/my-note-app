import { DocumentState, BlockState } from '../stores/documentState';
import convertBlockReducer from './convertBlock';

function getState(block: BlockState): DocumentState {
  return {
    version: 1,
    blocks: {
      byId: {
        [block.id]: block,
      },
      all: [block.id],
    },
    cursor: {
      row: 0,
      column: 0,
    },
  };
}

describe('convertBlock', () => {
  it('should convert a given block to a text block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'text',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'text',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });

  it('should convert a given block to a checkbox block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'text',
      parent: null,
      children: [],
      content: 'CONTENT',
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'checkbox',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: false,
    });
  });

  it('should convert a given block to an unordered list block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'unorderedList',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'unorderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });

  it('should convert a given block to an ordered list block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'orderedList',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });

  it('should convert a given block to an toggle list block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'toggleList',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'toggleList',
      parent: null,
      children: [],
      content: 'CONTENT',
      showChildren: true,
    });
  });

  it('should convert a given block to an heading 1 block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'heading1',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'heading1',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });

  it('should convert a given block to an heading 2 block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'heading2',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'heading2',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });

  it('should convert a given block to an heading 3 block', () => {
    // given
    const currentState = getState({
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    });

    // when
    const nextState = convertBlockReducer(currentState, {
      id: '0',
      type: 'heading3',
    });

    // then
    expect(nextState.blocks.byId[0]).toMatchObject({
      id: '0',
      type: 'heading3',
      parent: null,
      children: [],
      content: 'CONTENT',
    });
  });
});
