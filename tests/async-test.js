import mockAxios from '../__mocks__/axios';
import { ACTION_ASYNC } from '../__mocks__/action-types';

import {
    mockAsyncActionSuccess,
    mockAsyncActionFail,
} from '../__mocks__/actions';

const reduxArgs = {
    getState: jest.fn(),
    dispatch: jest.fn(),
};

describe('Async', () => {
    describe('Actions', () => {
        const spy = jest.spyOn(reduxArgs, 'dispatch');

        afterEach(() => {
            mockAxios.reset();
            spy.mockClear();
        });

        it('Should succeed async action', async () => {
            await mockAsyncActionSuccess(1)({ ...reduxArgs });

            expect(spy).toHaveBeenCalledWith({
                type: `${ACTION_ASYNC}_PENDING`,
                options: 1,
            });

            expect(spy).toHaveBeenCalledWith({
                type: `${ACTION_ASYNC}_SUCCESS`,
                payload: {
                    data: { id: 1, name: 'John Doe' },
                },
                options: 1,
            });

            expect(spy).toHaveBeenCalledTimes(2);
        });

        it('Should fail async action', async () => {
            try {
                await mockAsyncActionFail()({ ...reduxArgs }).catch(() => {});

                expect(spy).toHaveBeenCalledWith({
                    type: `${ACTION_ASYNC}_PENDING`,
                    options: undefined,
                });
            } catch (error) {
                expect(spy).toHaveBeenCalledWith({
                    type: `${ACTION_ASYNC}_FAIL`,
                    options: undefined,
                    payload: error,
                });
            }

            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
