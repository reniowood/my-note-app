import React from 'react';
import { shallow } from 'enzyme';
import Block from './Block';
import BlockHandler from './BlockHandler';

describe('<Block />', () => {
  it('should render <BlockHandler /> inside', () => {
    const wrapper = shallow(
      <Block id="0" index={0} />,
    );

    expect(wrapper.find(BlockHandler)).toHaveLength(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Block id="0" index={0}>
        <div>Children</div>
      </Block>,
    );

    expect(wrapper.contains(<div>Children</div>)).toBeTruthy();
  });

  it('should render <BlockHandler /> with it prop "enabled" set to be true when onMouseEnter event occurs', () => {
    const wrapper = shallow(
      <Block id="0" index={0} />,
    );

    wrapper.find('div').simulate('mouseEnter');
    expect(wrapper.find(BlockHandler).prop('enabled')).toBe(true);
  });

  it('should render <BlockHandler /> with it prop "enabled" set to be false when onMouseLeave event occurs', () => {
    const wrapper = shallow(
      <Block id="0" index={0} />,
    );

    wrapper.find('div').simulate('mouseEnter');
    wrapper.find('div').simulate('mouseLeave');
    expect(wrapper.find(BlockHandler).prop('enabled')).toBe(false);
  });
});
