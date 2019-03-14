import { createSelector } from 'reselect';

const branchSelector = state => state.users;

const userListSelector = createSelector(
    branchSelector,
    state => state && state.items
);

export { userListSelector };
