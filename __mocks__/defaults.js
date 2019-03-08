import { mockSyncAction, mockAsyncActionSuccess } from './actions';
import { mockCounterSelector, mockDataSelector } from './selectors';

const actionsMap = {
    syncFn: mockSyncAction,
    asyncFn: mockAsyncActionSuccess,
};

const mapState = state => ({
    counter: mockCounterSelector(state),
    data: mockDataSelector(state),
});

export { actionsMap, mapState };
