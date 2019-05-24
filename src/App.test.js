import React from 'react';
import ReactDOM from 'react-dom';
import api from './api';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('get spotify items using Promises', () => {
  it('should load spotify data', () => {
    return api.search('beatles', 'track').then((res) => {
      expect(res.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.anything(),
          }),
        ])
      );
    });
  });
});
