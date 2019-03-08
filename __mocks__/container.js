import React, { useEffect } from 'react';
import { useRedux } from './store';

import { mapState, actionsMap } from './defaults';

const MockContainer = () => {
    const [{ counter, data }, { syncFn, asyncFn }] = useRedux(
        mapState,
        actionsMap
    );

    useEffect(() => {
        try {
            syncFn(1);
            asyncFn(1);
        } catch (error) {
            throw Error(error);
        }
    }, []);

    return (
        <>
            {counter} {JSON.stringify(data)}
        </>
    );
};

export default MockContainer;
