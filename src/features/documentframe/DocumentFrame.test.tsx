import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import DocumentFrame from './DocumentFrame';
import Document from '../document/Document';
import * as Actions from '../document/stores/documentSlice';

describe('<DocumentFrame />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render <Document /> inside', () => {
    const wrapper = shallow(
      <DocumentFrame />,
    );

    expect(wrapper.find(Document)).toHaveLength(1);
  });

  it('should not run setCursorLastRow action when inside of Document is clicked', () => {
    const node = document.createElement('div');
    const targetNode = document.createElement('div');
    node.appendChild(targetNode);
    expect(node.contains(targetNode)).toBeTruthy();
    jest.spyOn(React, 'useRef').mockReturnValue({ current: node });
    jest.spyOn(Actions, 'setCursorLastRow');
    const wrapper = shallow(
      <DocumentFrame />,
    );

    wrapper.find('div').first().simulate('click', { target: targetNode });

    expect(Actions.setCursorLastRow).not.toHaveBeenCalled();
  });

  it('should run setCursorLastRow action when outside of Document is clicked', () => {
    const node = document.createElement('div');
    const targetNode = document.createElement('div');
    expect(node.contains(targetNode)).toBeFalsy();
    jest.spyOn(React, 'useRef').mockReturnValue({ current: node });
    jest.spyOn(Actions, 'setCursorLastRow');
    const wrapper = shallow(
      <DocumentFrame />,
    );

    wrapper.find('div').first().simulate('click', { target: targetNode });

    expect(Actions.setCursorLastRow).toHaveBeenCalled();
  });
});
