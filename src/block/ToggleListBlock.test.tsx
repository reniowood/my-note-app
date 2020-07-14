import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import ToggleListBlock from './ToggleListBlock';
import Block from './Block';
import { ToggleListBlockState } from '../stores/documentState';
import * as Actions from '../stores/documentSlice';
import Text from '../text/Text';
import styles from './ToggleListBlock.module.css';

describe('<ToggleListBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const block: ToggleListBlockState = {
    id: '0',
    type: 'toggleList',
    parent: null,
    children: [],
    content: 'CONTENT',
    showChildren: true,
  };

  it('should render <Block />', () => {
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).prop('id')).toBe('0');
    expect(wrapper.find(Block).prop('index')).toBe(0);
  });

  it('should render a triangle point down inside when the field "showChildren" of a given block is true', () => {
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={{
          ...block,
          showChildren: true,
        }}
      />,
    );

    expect(wrapper.find('div').find(`.${styles.toggleButton}`)).toHaveLength(1);
    expect(wrapper.find('div').find(`.${styles.toggleButton}`).text()).toBe('▼');
  });

  it('should render a triangle point up inside when the field "showChildren" of a given block is false', () => {
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={{
          ...block,
          showChildren: false,
        }}
      />,
    );

    expect(wrapper.find('div').find(`.${styles.toggleButton}`)).toHaveLength(1);
    expect(wrapper.find('div').find(`.${styles.toggleButton}`).text()).toBe('▶');
  });

  it('should render <Text /> inside', () => {
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('id')).toBe(block.id);
    expect(wrapper.find(Text).prop('index')).toBe(0);
    expect(wrapper.find(Text).prop('content')).toBe(block.content);
  });

  it('should update showChildren value of a given block using "turnOnToggleListBlock" when its toggle button is clicked', () => {
    const blockNotShowChildren = {
      ...block,
      showChildren: false,
    };
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={blockNotShowChildren}
      />,
    );
    jest.spyOn(Actions, 'turnOnToggleListBlock');

    wrapper.find('div').simulate('click');

    expect(Actions.turnOnToggleListBlock).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should update showChildren value of a given block using "turnOffToggleListBlock" when its toggle button is clicked', () => {
    const blockShowChildren = {
      ...block,
      showChildren: true,
    };
    const wrapper = shallow(
      <ToggleListBlock
        index={0}
        block={blockShowChildren}
      />,
    );
    jest.spyOn(Actions, 'turnOffToggleListBlock');

    wrapper.find('div').simulate('click');

    expect(Actions.turnOffToggleListBlock).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should call the action "convertBlockToTextBlock" when Text component gets keyDown event for backspace key', () => {
    const wrapper = shallow(
      <ToggleListBlock
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
