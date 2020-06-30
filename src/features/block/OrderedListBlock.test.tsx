import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import OrderedListBlock from './OrderedListBlock';
import Block from './Block';
import { OrderedListBlockState, BlocksState } from '../document/stores/documentState';
import * as Actions from '../document/stores/documentSlice';
import Text from '../text/Text';

describe('<OrderedListBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue({
      byId: {},
      all: [],
    } as BlocksState);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render <Block />', () => {
    const block: OrderedListBlockState = {
      id: '0',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).prop('id')).toBe('0');
    expect(wrapper.find(Block).prop('index')).toBe(0);
  });

  it('should render <Text /> inside', () => {
    const block: OrderedListBlockState = {
      id: '0',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('id')).toBe(block.id);
    expect(wrapper.find(Text).prop('index')).toBe(0);
    expect(wrapper.find(Text).prop('content')).toBe(block.content);
  });

  it('should call the action "convertBlockToTextBlock" when Text component gets keyDown event for backspace key', () => {
    const block: OrderedListBlockState = {
      id: '0',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={0}
        block={block}
      />,
    );
    jest.spyOn(Actions, 'convertBlockToTextBlock');

    wrapper.find(Text).simulate('backspaceKeyDown');

    expect(Actions.convertBlockToTextBlock).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should render the order of a given block when it is inside sequence of ordered list blocks', () => {
    const blocks: BlocksState = {
      byId: {
        0: {
          id: '0',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        1: {
          id: '1',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        2: {
          id: '2',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
      },
      all: ['0', '1', '2'],
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(blocks);
    const block: OrderedListBlockState = {
      id: '1',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={1}
        block={block}
      />,
    );

    expect(wrapper.find('div').text()).toBe('2.');
  });

  it('should render the order of a given block when it is child of another block', () => {
    const blocks: BlocksState = {
      byId: {
        0: {
          id: '0',
          type: 'orderedList',
          parent: null,
          children: ['1', '2'],
          content: 'CONTENT',
        },
        1: {
          id: '1',
          type: 'orderedList',
          parent: '0',
          children: [],
          content: 'CONTENT',
        },
        2: {
          id: '2',
          type: 'orderedList',
          parent: '0',
          children: [],
          content: 'CONTENT',
        },
      },
      all: ['0', '1', '2'],
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(blocks);
    const block: OrderedListBlockState = {
      id: '2',
      type: 'orderedList',
      parent: '0',
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={2}
        block={block}
      />,
    );

    expect(wrapper.find('div').text()).toBe('2.');
  });

  it('should render the order of a given block when there are another sequence of unordered list blocks and it is not inside of it', () => {
    const blocks: BlocksState = {
      byId: {
        0: {
          id: '0',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        1: {
          id: '1',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        2: {
          id: '2',
          type: 'text',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        3: {
          id: '3',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
        4: {
          id: '4',
          type: 'orderedList',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
      },
      all: ['0', '1', '2', '3', '4'],
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(blocks);
    const block: OrderedListBlockState = {
      id: '4',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <OrderedListBlock
        index={4}
        block={block}
      />,
    );

    expect(wrapper.find('div').text()).toBe('2.');
  });
});
