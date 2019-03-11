import { createAsyncActionReducers, createReducer } from '../../src';
import { ACTION_SYNC, ACTION_ASYNC } from './action-types';

export const initialState = {
    isPending: 0,
    data: {},
    counter: 0,
};

export const actionsMap = {
    // Synchronous action reducer (direct dispatch). The action type is mapped to the state reducer method.
    [ACTION_SYNC]: (state, { payload }) => ({
        counter: state.counter + payload,
    }),

    // Async action reducer (promised based action wrapper)
    // Will spread out a list of typed reducers based on the current async request phase.
    // Takes the base name as type and a config object with reducer methods for each phase.
    // For example, these variants are created: ACTION_ASYNC_PENDING, ACTION_ASYNC_SUCCESS, ACTION_ASYNC_FAIL
    ...createAsyncActionReducers(ACTION_ASYNC, {
        onSuccess: (state, { payload }) => ({
            data: payload.data,
        }),
    }),
};

export default createReducer(initialState, actionsMap);
