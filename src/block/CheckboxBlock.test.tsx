import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import CheckboxBlock from './CheckboxBlock';
import Block from './Block';
import { CheckboxBlockState } from '../stores/documentState';
import * as Actions from '../stores/documentSlice';
import Text from '../text/Text';

describe('<CheckboxBlock />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const block: CheckboxBlockState = {
    id: '0',
    type: 'checkbox',
    parent: null,
    children: [],
    content: 'CONTENT',
    isChecked: false,
  };

  it('should render <Block />', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).prop('id')).toBe('0');
    expect(wrapper.find(Block).prop('index')).toBe(0);
  });

  it('should render a checked checkbox inside when the field "isChecked" of a given block is true', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={{
          ...block,
          isChecked: true,
        }}
      />,
    );

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });

  it('should render an unchecked checkbox inside when the field "isChecked" of a given block is true', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={{
          ...block,
          isChecked: false,
        }}
      />,
    );

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should render <Text /> inside', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={block}
      />,
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('id')).toBe(block.id);
    expect(wrapper.find(Text).prop('index')).toBe(0);
    expect(wrapper.find(Text).prop('content')).toBe(block.content);
  });

  it('should update isChecked value of a given block using "checkCheckboxBlock" when its checkbox input is checked', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={block}
      />,
    );
    jest.spyOn(Actions, 'checkCheckboxBlock');

    wrapper.find('input').simulate('change', { target: { checked: true } });

    expect(Actions.checkCheckboxBlock).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should update isChecked value of a given block using "uncheckCheckboxBlock" when its checkbox input is unchecked', () => {
    const wrapper = shallow(
      <CheckboxBlock
        index={0}
        block={block}
      />,
    );
    jest.spyOn(Actions, 'uncheckCheckboxBlock');

    wrapper.find('input').simulate('change', { target: { checked: false } });

    expect(Actions.uncheckCheckboxBlock).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should call the action "convertBlockToTextBlock" when Text component gets keyDown event for backspace key', () => {
    const wrapper = shallow(
      <CheckboxBlock
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
