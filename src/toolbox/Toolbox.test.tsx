import React from 'react';
import { shallow } from 'enzyme';
import Toolbox from './Toolbox';
import ToolboxBlockTypeButton from './ToolboxBlockTypeButton';

describe('<Toolbox />', () => {
  it('should render <ToolboxBlockTypeButton /> for "text" block type inside', () => {
    const wrapper = shallow(
      <Toolbox />,
    );

    expect(wrapper.find(ToolboxBlockTypeButton).find({ blockType: 'text' })).toHaveLength(1);
  });

  it('should render <ToolboxBlockTypeButton /> for "unorderedList" block type inside', () => {
    const wrapper = shallow(
      <Toolbox />,
    );

    expect(wrapper.find(ToolboxBlockTypeButton).find({ blockType: 'unorderedList' })).toHaveLength(1);
  });

  it('should render <ToolboxBlockTypeButton /> for "orderedList" block type inside', () => {
    const wrapper = shallow(
      <Toolbox />,
    );

    expect(wrapper.find(ToolboxBlockTypeButton).find({ blockType: 'orderedList' })).toHaveLength(1);
  });

  it('should render <ToolboxBlockTypeButton /> for "checkbox" block type inside', () => {
    const wrapper = shallow(
      <Toolbox />,
    );

    expect(wrapper.find(ToolboxBlockTypeButton).find({ blockType: 'checkbox' })).toHaveLength(1);
  });

  it('should render <ToolboxBlockTypeButton /> for "toggleList" block type inside', () => {
    const wrapper = shallow(
      <Toolbox />,
    );

    expect(wrapper.find(ToolboxBlockTypeButton).find({ blockType: 'toggleList' })).toHaveLength(1);
  });
});
