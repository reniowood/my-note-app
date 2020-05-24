import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

/**
 * mock document.createRange and document.getSelection to prevent errors like
 * `document.createRange is not a function` or
 * `document.getSelection is not a function`
 * during the tests.
*/
let oldCreateRange: (() => Range) | null = null;

beforeAll(() => {
  oldCreateRange = document.createRange;
  document.createRange = jest.fn().mockImplementation(() => ({
    setStart: jest.fn(),
    collapse: jest.fn(),
  }));
  document.getSelection = jest.fn();
});

afterAll(() => {
  if (oldCreateRange) {
    document.createRange = oldCreateRange;
  }
});

test('renders title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText(/my-note/i)).toBeInTheDocument();
});
