import convertBlockToCheckboxBlockReducer from './convertBlockToCheckboxBlock';
import { DocumentState } from '../stores/documentState';

describe('convertBlockToCheckboxBlock', () => {
  it('should convert a given block into a checkbox block', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE',
            children: [],
          },
        },
        all: ['0'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = convertBlockToCheckboxBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE',
            children: [],
            isChecked: false,
          },
        },
      },
    });
  });

  it('should not change its isChecked value of a given block when it is already a checkbox block', () => {
    // given
    const currentState: DocumentState = {
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'checkbox',
            parent: null,
            content: 'LINE',
            children: [],
            isChecked: true,
          },
        },
        all: ['0'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = convertBlockToCheckboxBlockReducer(currentState, { id: '0' });

    // then
    expect(nextState).toStrictEqual(currentState);
  });
});
