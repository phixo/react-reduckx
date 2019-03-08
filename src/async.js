import { reduceWith } from './reducer';

const decreasePendingState = state => ({
    isPending: Math.max(0, state.isPending - 1),
});

const increasePendingState = state => ({ isPending: state.isPending + 1 });

const createAsyncReducer = (reduceFn, isPending) => (state, action) => ({
    ...reduceWith(reduceFn, state, action),
    ...(isPending ? increasePendingState(state) : decreasePendingState(state)),
});

const createAsyncAction = (type, operation, defaultOptions) => {
    return (options = defaultOptions) => ({ getState, dispatch }) => {
        dispatch({
            type: `${type}_PENDING`,
            options,
        });

        const promise = new Promise(async (resolve, reject) => {
            try {
                const res = await operation(options, getState, dispatch);
                const payload = res.data;

                dispatch({
                    type: `${type}_SUCCESS`,
                    payload,
                    options,
                });

                resolve(payload);
            } catch (error) {
                dispatch({
                    type: `${type}_FAIL`,
                    payload: error,
                    options,
                });

                reject(error);
            }
        });

        return promise;
    };
};

const createAsyncActionReducers = (type, options) => {
    const { onPending, onSuccess, onFail } = options;

    return {
        [`${type}_PENDING`]: createAsyncReducer(onPending, true),
        [`${type}_SUCCESS`]: createAsyncReducer(onSuccess, false),
        [`${type}_FAIL`]: createAsyncReducer(onFail, false),
    };
};

export { createAsyncAction, createAsyncActionReducers };
