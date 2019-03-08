import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import PropTypes from 'prop-types';

const createStore = (reducer, initialState) => {
    const ReduxContext = createContext();

    const ReduxProvider = ({ children }) => {
        const [isInitialized, setInitialized] = useState(false);
        const [state, dispatch] = useReducer(reducer, initialState);

        useEffect(() => {
            dispatch({ type: '@@REDUCKX/INIT' });
            setInitialized(true);
        }, []);

        return (
            <ReduxContext.Provider value={{ state, dispatch }}>
                {isInitialized && children}
            </ReduxContext.Provider>
        );
    };

    ReduxProvider.defaultProps = {
        children: null,
    };

    ReduxProvider.propTypes = {
        children: PropTypes.node,
    };

    const useRedux = (mapState, actionsMap, context = null) => {
        const { state, dispatch } = useContext(context || ReduxContext);
        const mappedState = mapState(state);

        const mappedActions = Object.keys(actionsMap).reduce((acc, key) => {
            const actionCreator = actionsMap[key];

            const fn = (...args) => {
                const action = actionCreator(...args);

                if (typeof action !== 'function') {
                    return dispatch(action);
                }
                return action({ getState: () => state, dispatch });
            };
            return { ...acc, [key]: fn };
        }, {});

        return [mappedState, mappedActions, dispatch];
    };

    return { ReduxProvider, useRedux };
};

export default createStore;
