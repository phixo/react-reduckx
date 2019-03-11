import { combineReducers, reduceWith } from '../src';
import { mockSyncAction } from './__mocks__/actions';
import mockReducer, { initialState } from './__mocks__/reducers';

const test = {
    reduceFn: jest.fn(),
};

const state = {
    name: 'John Doe',
};

const action = mockSyncAction({ id: 1 });

describe('Reducer', () => {
    const spy = jest.spyOn(test, 'reduceFn');

    afterEach(() => {
        spy.mockClear();
    });

    it('Should combine reducers', () => {
        const reducer = combineReducers({
            mock: mockReducer,
            foo: mockReducer,
        });
        const nextState = reducer(initialState, { type: 'MOCK/ACTION_SYNC' });
        expect(nextState).toMatchSnapshot();
    });

    it('Should wrap reducer', () => {
        reduceWith(test.reduceFn, state, action);

        expect(spy).toHaveBeenCalledWith(state, action);
    });
});
