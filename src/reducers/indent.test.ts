import { DocumentState } from '../stores/documentState';
import indentReducer from './indent';

describe('indent', () => {
  it('should indent the given block', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: [],
          },
          1: {
            id: '1',
            type: 'text',
            parent: null,
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
      cursor: {
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState = indentReducer(currentState, { id: '1' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: ['1'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
    });
  });

  it('should not indent the given block when it is the first children', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: ['1'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
      cursor: {
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState = indentReducer(currentState, { id: '1' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: ['1'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
            content: 'LINE2',
            children: [],
          },
          2: {
            id: '2',
            type: 'text',
            parent: null,
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2'],
      },
    });
  });

  it('should not indent the given block when it is the first root block', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
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
    const nextState = indentReducer(currentState, { id: '0' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: [],
          },
        },
        all: ['0'],
      },
    });
  });

  it('should indent the given block when it has children', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'text',
            parent: null,
            content: 'LINE1',
            children: ['1', '3'],
          },
          1: {
            id: '1',
            type: 'text',
            parent: '0',
            content: 'LINE2',
            children: ['2'],
          },
          2: {
            id: '2',
            type: 'text',
            parent: '1',
            content: 'LINE3',
            children: [],
          },
          3: {
            id: '2',
            type: 'text',
            parent: '0',
            content: 'LINE3',
            children: ['4'],
          },
          4: {
            id: '2',
            type: 'text',
            parent: '3',
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2', '3', '4'],
      },
      cursor: {
        row: 2,
        column: 0,
      },
    };

    // when
    const nextState = indentReducer(currentState, { id: '3' });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            parent: null,
            content: 'LINE1',
            children: ['1'],
          },
          1: {
            id: '1',
            parent: '0',
            content: 'LINE2',
            children: ['2', '3'],
          },
          2: {
            id: '2',
            parent: '1',
            content: 'LINE3',
            children: [],
          },
          3: {
            id: '2',
            parent: '1',
            content: 'LINE3',
            children: ['4'],
          },
          4: {
            id: '2',
            parent: '3',
            content: 'LINE3',
            children: [],
          },
        },
        all: ['0', '1', '2', '3', '4'],
      },
    });
  });

  it('should make the block show children when the block is ToggleListBlock and its showChildren is false', () => {
    // given
    const currentState: DocumentState = {
      version: 1,
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'toggleList',
            content: 'LINE',
            parent: null,
            children: [],
            showChildren: false,
          },
          1: {
            id: '1',
            type: 'toggleList',
            content: 'LINE',
            parent: null,
            children: [],
            showChildren: true,
          },
        },
        all: ['0', '1'],
      },
      cursor: {
        row: 0,
        column: 0,
      },
    };

    // when
    const nextState = indentReducer(currentState, {
      id: '1',
    });

    // then
    expect(nextState).toMatchObject({
      blocks: {
        byId: {
          0: {
            id: '0',
            type: 'toggleList',
            content: 'LINE',
            parent: null,
            children: ['1'],
            showChildren: true,
          },
          1: {
            id: '1',
            type: 'toggleList',
            content: 'LINE',
            parent: '0',
            children: [],
            showChildren: true,
          },
        },
        all: ['0', '1'],
      },
    });
  });
});
