import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import Component from './Component';
import {
  TextBlockState,
  CheckboxBlockState,
  UnorderedListBlockState,
  BlocksState,
  OrderedListBlockState,
} from '../stores/documentState';
import TextBlock from '../block/TextBlock';
import CheckboxBlock from '../block/CheckboxBlock';
import UnorderedListBlock from '../block/UnorderedListBlock';
import OrderedListBlock from '../block/OrderedListBlock';

describe('<Component />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(jest.fn());
  });

  it('should render a given text block', () => {
    const block: TextBlockState = {
      id: '0',
      type: 'text',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <Component
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(TextBlock)).toHaveLength(1);
    expect(wrapper.find(TextBlock).prop('block')).toBe(block);
  });

  it('should render a given checkbox block', () => {
    const block: CheckboxBlockState = {
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: true,
    };
    const wrapper = shallow(
      <Component
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(CheckboxBlock)).toHaveLength(1);
    expect(wrapper.find(CheckboxBlock).prop('block')).toBe(block);
  });

  it('should render a given unordered list block', () => {
    const block: UnorderedListBlockState = {
      id: '0',
      type: 'unorderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <Component
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(UnorderedListBlock)).toHaveLength(1);
    expect(wrapper.find(UnorderedListBlock).prop('block')).toBe(block);
  });

  it('should render a given ordered list block', () => {
    const block: OrderedListBlockState = {
      id: '0',
      type: 'orderedList',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <Component
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(OrderedListBlock)).toHaveLength(1);
    expect(wrapper.find(OrderedListBlock).prop('block')).toBe(block);
  });

  it('should render children blocks of a given block', () => {
    const blocks: BlocksState = {
      byId: {
        0: {
          id: '0',
          type: 'text',
          parent: null,
          children: ['1', '2'],
          content: 'CONTENT',
        },
        1: {
          id: '1',
          type: 'text',
          parent: '0',
          children: [],
          content: 'CONTENT',
        },
        2: {
          id: '2',
          type: 'text',
          parent: '0',
          children: ['3'],
          content: 'CONTENT',
        },
        3: {
          id: '3',
          type: 'text',
          parent: '2',
          children: [],
          content: 'CONTENT',
        },
      },
      all: ['0', '1', '2', '3'],
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(blocks);
    const block: TextBlockState = {
      id: '0',
      type: 'text',
      parent: null,
      children: ['1', '2'],
      content: 'CONTENT',
    };
    const wrapper = shallow(
      <Component
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Component)).toHaveLength(2);
    block.children.forEach((childId) => {
      expect(wrapper.find(Component).find({ block: blocks.byId[childId] })).toHaveLength(1);
    });
  });
});
