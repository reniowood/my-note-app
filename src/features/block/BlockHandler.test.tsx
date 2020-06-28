import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import * as Actions from '../document/stores/documentSlice';
import BlockHandler from './BlockHandler';

describe('<BlockHandler />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a visible add button when it is enabled', () => {
    const wrapper = shallow(
      <BlockHandler
        id="0"
        index={0}
        enabled
      />,
    );

    expect(wrapper.find('div').prop('style')).toHaveProperty('visibility', 'visible');
  });

  it('should render a hidden add button when it is disabled', () => {
    const wrapper = shallow(
      <BlockHandler
        id="0"
        index={0}
        enabled={false}
      />,
    );

    expect(wrapper.find('div').prop('style')).toHaveProperty('visibility', 'hidden');
  });

  it('should dispatch actions to add a new block next to its block when it is clicked', () => {
    const wrapper = shallow(
      <BlockHandler
        id="0"
        index={0}
        enabled
      />,
    );
    jest.spyOn(Actions, 'addBlockNextTo');
    jest.spyOn(Actions, 'setCursorRow');
    jest.spyOn(Actions, 'setCursorColumn');

    wrapper.find('span').simulate('click');

    expect(Actions.addBlockNextTo).toHaveBeenCalledWith({
      id: '0',
      content: '',
    });
    expect(Actions.setCursorRow).toHaveBeenCalledWith({
      row: 1,
    });
    expect(Actions.setCursorColumn).toHaveBeenCalledWith({
      column: 0,
    });
  });

  it('should dispatch actions to add a new block next to its block when there is keyDown event on it', () => {
    const wrapper = shallow(
      <BlockHandler
        id="0"
        index={0}
        enabled
      />,
    );
    jest.spyOn(Actions, 'addBlockNextTo');
    jest.spyOn(Actions, 'setCursorRow');
    jest.spyOn(Actions, 'setCursorColumn');

    wrapper.find('span').simulate('keyDown');

    expect(Actions.addBlockNextTo).toHaveBeenCalledWith({
      id: '0',
      content: '',
    });
    expect(Actions.setCursorRow).toHaveBeenCalledWith({
      row: 1,
    });
    expect(Actions.setCursorColumn).toHaveBeenCalledWith({
      column: 0,
    });
  });
});
