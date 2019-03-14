import { createAsyncActionReducers, createReducer } from 'react-reduckx';

import { FETCH_USERS } from './action-types';

const initialState = {
    isPending: 0,
    items: [],
};

const actionsMap = {
    ...createAsyncActionReducers(FETCH_USERS, {
        onSuccess: (state, { payload }) => ({
            items: payload,
        }),
    }),
};

export default createReducer(initialState, actionsMap);
