import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import Document from './Document';
import { BlocksState } from '../stores/documentState';
import Component from '../component/Component';

describe('<Document />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(jest.fn());
  });

  it('should render all root blocks as <Component />', () => {
    const blocks: BlocksState = {
      byId: {
        0: {
          id: '0',
          type: 'text',
          parent: null,
          children: ['1'],
          content: 'CONTENT',
        },
        1: {
          id: '1',
          type: 'text',
          parent: '0',
          children: [],
          content: 'CONTENT',
        },
        2: {
          id: '2',
          type: 'text',
          parent: null,
          children: [],
          content: 'CONTENT',
        },
      },
      all: ['0', '1', '2'],
    };
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(blocks);
    const wrapper = shallow(
      <Document />,
    );

    expect(wrapper.find(Component)).toHaveLength(2);
  });
});
