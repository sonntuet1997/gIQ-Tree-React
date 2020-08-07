import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import AppMenuItem from './AppMenuItem';
import {act} from 'react-dom/test-utils';
import {configTests} from 'setupTests';

describe('AppMenuItem', () => {
  it('renders without crashing', () => {
    act(async () => {
      await configTests();
    });
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <AppMenuItem item={{path: '/'}}/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
