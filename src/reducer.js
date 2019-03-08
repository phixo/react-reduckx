import Logger from './logger';

const combineReducers = reducers => {
    const branches = Object.keys(reducers);

    return (state = {}, action) => {
        const nextState = {};

        branches.forEach(branch => {
            const reduceFn = reducers[branch];
            const prevState = state[branch];

            nextState[branch] = reduceFn(prevState, action);
        });

        Logger.log(action, state, nextState);

        return nextState;
    };
};

const createReducer = (initialState, actionsMap) => (state, action) => {
    const prevState = state || initialState;
    const reduceFn = actionsMap[action.type || ''];

    if (!reduceFn) {
        return prevState;
    }

    return {
        ...prevState,
        ...reduceFn(prevState, action),
    };
};

const reduceWith = (reduceFn, state, action) => {
    if (!reduceFn) {
        return state;
    }
    return reduceFn(state, action);
};

export { combineReducers, createReducer, reduceWith };
