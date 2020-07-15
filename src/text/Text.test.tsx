import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';
import Text from './Text';
import * as Actions from '../stores/documentSlice';
import * as TextService from './TextService';

describe('<Text />', () => {
  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render contentEditable div element', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').prop('contentEditable')).toBeTruthy();
    expect(wrapper.find('div').text()).toBe('CONTENT');
  });

  it('should dispatch actions to split a given block into two blocks when Enter key is pressed', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(3);
    jest.spyOn(Actions, 'updateBlock');
    jest.spyOn(Actions, 'addBlockNextTo');
    jest.spyOn(Actions, 'setCursorRow');
    jest.spyOn(Actions, 'setCursorColumn');

    wrapper.find('div').simulate(
      'keyDown',
      {
        key: 'Enter',
        currentTarget: {
          innerText: 'CONTENT',
        },
        preventDefault: jest.fn(),
      },
    );

    expect(Actions.updateBlock).toHaveBeenCalledWith({
      id: '0',
      content: 'CON',
    });
    expect(Actions.addBlockNextTo).toHaveBeenCalledWith({
      id: '0',
      content: 'TENT',
    });
    expect(Actions.setCursorRow).toHaveBeenCalledWith({
      row: 1,
    });
    expect(Actions.setCursorColumn).toHaveBeenCalledWith({
      column: 0,
    });
  });

  it('should dispatch "moveCursorUp" action when ArrowUp key is pressed', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(0);
    jest.spyOn(Actions, 'moveCursorUp');

    wrapper.find('div').simulate(
      'keyDown',
      {
        key: 'ArrowUp',
        currentTarget: {
          innerText: 'CONTENT',
        },
        preventDefault: jest.fn(),
      },
    );

    expect(Actions.moveCursorUp).toHaveBeenCalled();
  });

  it('should dispatch "moveCursorDown" action when ArrowDown key is pressed', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(0);
    jest.spyOn(Actions, 'moveCursorDown');

    wrapper.find('div').simulate(
      'keyDown',
      {
        key: 'ArrowDown',
        currentTarget: {
          innerText: 'CONTENT',
        },
        preventDefault: jest.fn(),
      },
    );

    expect(Actions.moveCursorDown).toHaveBeenCalled();
  });

  it('should dispatch "outdent" action when Tab and Shift key are pressed at the same time', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(0);
    jest.spyOn(Actions, 'outdent');

    wrapper.find('div').simulate(
      'keyDown',
      {
        shiftKey: true,
        key: 'Tab',
        currentTarget: {
          innerText: 'CONTENT',
        },
        preventDefault: jest.fn(),
      },
    );

    expect(Actions.outdent).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should dispatch "indent" action when Tab key is pressed', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(0);
    jest.spyOn(Actions, 'indent');

    wrapper.find('div').simulate(
      'keyDown',
      {
        shiftKey: false,
        key: 'Tab',
        currentTarget: {
          innerText: 'CONTENT',
        },
        preventDefault: jest.fn(),
      },
    );

    expect(Actions.indent).toHaveBeenCalledWith({
      id: '0',
    });
  });

  it('should call onBackspaceKeydown of props when Backspace key is pressed', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    const cursorPosition = 0;
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(cursorPosition);
    const element = {
      innerText: 'CONTENT',
    };
    const event = {
      key: 'Backspace',
      currentTarget: element,
      preventDefault: jest.fn(),
    };

    wrapper.find('div').simulate(
      'keyDown',
      event,
    );

    expect(onBackspaceKeyDown).toHaveBeenCalledWith(event, element, cursorPosition);
  });

  it('should call both setCursorRow and setCursorColumn action when it gets focused but the cursor was not on', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(ReactRedux, 'useSelector').mockReturnValue({
      row: 1,
      column: 0,
    });
    const cursorPosition = 0;
    jest.spyOn(TextService, 'getCursorPosition').mockReturnValue(cursorPosition);
    jest.spyOn(Actions, 'setCursorRow');
    jest.spyOn(Actions, 'setCursorColumn');

    wrapper.find('div').simulate('focus');

    expect(Actions.setCursorRow).toHaveBeenCalledWith({
      row: 0,
    });
    expect(Actions.setCursorColumn).toHaveBeenCalledWith({
      column: cursorPosition,
    });
  });

  it('should call updateBlock action when it gets lost its focus', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );
    jest.spyOn(Actions, 'updateBlock');

    wrapper.find('div').simulate(
      'blur',
      {
        currentTarget: {
          innerText: 'CONTENT',
        },
      },
    );

    expect(Actions.updateBlock).toHaveBeenCalledWith({
      id: '0',
      content: 'CONTENT',
    });
  });

  it('should put a given className into its className of div element', () => {
    const onBackspaceKeyDown = jest.fn();
    const wrapper = shallow(
      <Text
        id="0"
        index={0}
        content="CONTENT"
        className="CLASS_NAME"
        onBackspaceKeyDown={onBackspaceKeyDown}
      />,
    );

    expect(wrapper.find('div').prop('className')).toContain('CLASS_NAME');
  });
});
