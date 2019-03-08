import { createSelector } from 'reselect';

const branchSelector = state => state.mock;

const mockDataSelector = createSelector(
    branchSelector,
    state => state && state.data
);

const mockCounterSelector = createSelector(
    branchSelector,
    state => state && state.counter
);

export { branchSelector, mockCounterSelector, mockDataSelector };
