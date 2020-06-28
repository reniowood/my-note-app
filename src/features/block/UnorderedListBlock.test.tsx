import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import UnorderedListBlock from './UnorderedListBlock';
import Block from './Block';
import { UnorderedListBlockState } from '../document/stores/documentState';
import * as Actions from '../document/stores/documentSlice';
import Text from '../text/Text';

describe('<UnorderedListBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const block: UnorderedListBlockState = {
    id: '0',
    type: 'unorderedList',
    parent: null,
    children: [],
    content: 'CONTENT',
  };

  it('should render <Block />', () => {
    const wrapper = shallow(
      <UnorderedListBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).prop('id')).toBe('0');
    expect(wrapper.find(Block).prop('index')).toBe(0);
  });

  it('should render <Text /> inside', () => {
    const wrapper = shallow(
      <UnorderedListBlock
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
    const wrapper = shallow(
      <UnorderedListBlock
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
});
