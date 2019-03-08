import axios from 'axios';
import { createAsyncAction } from '../src';
import { ACTION_ASYNC, ACTION_SYNC } from './action-types';

const mockAsyncActionSuccess = createAsyncAction(ACTION_ASYNC, id =>
    axios.get(`/mock/${id}`)
);

const mockAsyncActionFail = createAsyncAction(ACTION_ASYNC, () =>
    axios.get(`/mock/fail`)
);

const mockSyncAction = payload => ({
    type: ACTION_SYNC,
    payload,
});

export { mockAsyncActionSuccess, mockAsyncActionFail, mockSyncAction };
