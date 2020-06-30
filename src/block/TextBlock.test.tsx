import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import TextBlock from './TextBlock';
import Block from './Block';
import { TextBlockState } from '../stores/documentState';
import * as Actions from '../stores/documentSlice';
import Text from '../text/Text';

describe('<TextBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const block: TextBlockState = {
    id: '0',
    type: 'text',
    parent: null,
    children: [],
    content: 'CONTENT',
  };

  it('should render <Block />', () => {
    const wrapper = shallow(
      <TextBlock
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
      <TextBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('id')).toBe(block.id);
    expect(wrapper.find(Text).prop('index')).toBe(0);
    expect(wrapper.find(Text).prop('content')).toBe(block.content);
  });

  it('should call the action "mergeOrOutdent" when Text component gets keyDown event for backspace key', () => {
    const wrapper = shallow(
      <TextBlock
        index={0}
        block={block}
      />,
    );
    jest.spyOn(Actions, 'mergeOrOutdent');

    wrapper.find(Text).simulate('backspaceKeyDown');

    expect(Actions.mergeOrOutdent).toHaveBeenCalledWith({
      id: '0',
    });
  });
});
