import React, { createContext } from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import {
    renderHook,
    cleanup,
    act as actHook,
} from 'react-hooks-testing-library';

import mockAxios from '../__mocks__/axios';
import { actionsMap, mapState } from '../__mocks__/defaults';
import MockContainer from '../__mocks__/container';
import { ReduxProvider, useRedux } from '../__mocks__/store';

const mockReduckx = {
    dispatch: jest.fn(),
    state: jest.fn(() => {}),
};

describe('Store', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe('ReduxProvider', () => {
        it('Should render properly', () => {
            const el = (
                <ReduxProvider>
                    <MockContainer />
                </ReduxProvider>
            );
            const tree = TestRenderer.create(el);

            act(() => {
                tree.update(el);
            });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('useRedux', () => {
        const dispatchSpy = jest.spyOn(mockReduckx, 'dispatch');

        afterEach(() => {
            cleanup();
            dispatchSpy.mockClear();
        });

        it('Should return props with useRedux hook', () => {
            const context = createContext(mockReduckx);
            const { result } = renderHook(() =>
                useRedux(mapState, actionsMap, context)
            );
            const [, { syncFn, asyncFn }] = result.current;

            actHook(() => {
                syncFn(10);
            });

            expect(dispatchSpy).toBeCalledWith({
                payload: 10,
                type: 'MOCK/ACTION_SYNC',
            });

            actHook(() => {
                dispatchSpy.mockClear();
                asyncFn(100);
            });

            expect(dispatchSpy).toBeCalledWith({
                options: 100,
                type: 'MOCK/ACTION_ASYNC_PENDING',
            });
        });
    });
});
