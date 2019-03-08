import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import pathToRegexp from 'path-to-regexp';

const mockAxios = new MockAdapter(axios);

mockAxios.onGet(pathToRegexp('/mock/:id')).reply(200, {
    data: { id: 1, name: 'John Doe' },
});

mockAxios.onGet('/mock/fail').networkErrorOnce();

export default mockAxios;
