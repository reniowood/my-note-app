import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import ToolboxBlockTypeButton from './ToolboxBlockTypeButton';
import * as Actions from '../stores/documentSlice';
import { CheckboxBlockState, TextBlockState } from '../stores/documentState';
import styles from './ToolboxBlockTypeButton.module.css';

describe('<ToolboxBlockTypeButton />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render button with a given material icon', () => {
    const wrapper = shallow(
      <ToolboxBlockTypeButton
        blockType="text"
        materialIconName="MATERIAL_ICON_NAME"
      />,
    );

    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').text()).toBe('MATERIAL_ICON_NAME');
    expect(wrapper.find('button').prop('className')).toContain('material-icons');
  });

  it('should call the action that converts a selected block for a given type when the button is clicked', () => {
    const block: TextBlockState = {
      id: '0',
      type: 'text',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(block);
    jest.spyOn(Actions, 'convertBlock');
    const wrapper = shallow(
      <ToolboxBlockTypeButton
        blockType="checkbox"
        materialIconName="MATERIAL_ICON_NAME"
      />,
    );

    wrapper.find('button').simulate('click');

    expect(Actions.convertBlock).toHaveBeenCalledWith({
      id: '0',
      type: 'checkbox',
    });
  });

  it('should contain the class name for a selected button when its type is the same as the type of a given block', () => {
    const block: CheckboxBlockState = {
      id: '0',
      type: 'checkbox',
      parent: null,
      children: [],
      content: 'CONTENT',
      isChecked: false,
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(block);
    const wrapper = shallow(
      <ToolboxBlockTypeButton
        blockType="checkbox"
        materialIconName="MATERIAL_ICON_NAME"
      />,
    );

    expect(wrapper.find('button').prop('className')).toContain(styles.selectedButton);
  });

  it('should not contain the class name for a selected button when its type is different from the type of a given block', () => {
    const block: TextBlockState = {
      id: '0',
      type: 'text',
      parent: null,
      children: [],
      content: 'CONTENT',
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(block);
    const wrapper = shallow(
      <ToolboxBlockTypeButton
        blockType="checkbox"
        materialIconName="MATERIAL_ICON_NAME"
      />,
    );

    expect(wrapper.find('button').prop('className')).not.toContain(styles.selectedButton);
  });
});
