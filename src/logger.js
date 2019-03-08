/* eslint-disable no-console */
const COLOR_ACTION = '#03A9F4';
const COLOR_NEXT = '#4CAF50';
const COLOR_PREV = '#9E9E9E';

const Logger = {
    log: (action = {}, prevState = {}, nextState = {}) => {
        if (action.type) {
            console.group(action.type);
            console.log('%cprev state', `color: ${COLOR_PREV};`, prevState);
            console.log('%caction    ', `color: ${COLOR_ACTION};`, action);
            console.log('%cnext state', `color: ${COLOR_NEXT};`, nextState);
            console.groupEnd();
        }
    },
};

export default Logger;
