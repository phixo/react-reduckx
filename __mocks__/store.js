import { combineReducers, createStore } from '../src';
import mockReducer, { initialState as mockState } from './reducers';

const rootReducer = combineReducers({
    mock: mockReducer,
    foo: mockReducer,
});

const initialState = {
    mock: { ...mockState },
};

export const { ReduxProvider, useRedux } = createStore(
    rootReducer,
    initialState
);
