import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import HeadingBlock from './HeadingBlock';
import Block from './Block';
import { HeadingBlockState } from '../stores/documentState';
import * as Actions from '../stores/documentSlice';
import Text from '../text/Text';
import styles from './HeadingBlock.module.css';

describe('<HeadingBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const block: HeadingBlockState = {
    id: '0',
    type: 'heading1',
    parent: null,
    children: [],
    content: 'CONTENT',
  };

  it('should render <Block />', () => {
    const wrapper = shallow(
      <HeadingBlock
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
      <HeadingBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('id')).toBe(block.id);
    expect(wrapper.find(Text).prop('index')).toBe(0);
    expect(wrapper.find(Text).prop('content')).toBe(block.content);
  });

  it('should put corresponding className to the className prop of <Text />', () => {
    const wrapper1 = shallow(
      <HeadingBlock
        index={0}
        block={block}
      />,
    );
    const wrapper2 = shallow(
      <HeadingBlock
        index={0}
        block={{
          ...block,
          type: 'heading2',
        }}
      />,
    );
    const wrapper3 = shallow(
      <HeadingBlock
        index={0}
        block={{
          ...block,
          type: 'heading3',
        }}
      />,
    );

    expect(wrapper1.find(Text).prop('className')).toContain(styles.heading1);
    expect(wrapper2.find(Text).prop('className')).toContain(styles.heading2);
    expect(wrapper3.find(Text).prop('className')).toContain(styles.heading3);
  });

  it('should call the action "convertBlockToTextBlock" when Text component gets keyDown event for backspace key', () => {
    const wrapper = shallow(
      <HeadingBlock
        index={0}
        block={block}
      />,
    );
    jest.spyOn(Actions, 'convertBlock');

    wrapper.find(Text).simulate('backspaceKeyDown');

    expect(Actions.convertBlock).toHaveBeenCalledWith({
      id: '0',
      type: 'text',
    });
  });
});
