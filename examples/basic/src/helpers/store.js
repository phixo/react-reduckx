import { combineReducers, createStore } from 'react-reduckx';

import usersReducer from '../ducks/users/reducers';

const rootReducer = combineReducers({
    users: usersReducer,
});

const initialState = {};

export const { ReduxProvider, useRedux } = createStore(
    rootReducer,
    initialState
);
