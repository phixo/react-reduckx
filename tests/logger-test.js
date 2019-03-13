/* eslint-disable no-console */
import Logger from '../src/logger';

import { mockSyncAction } from './__mocks__/actions';

describe('Reducks | logger', () => {
    const mockAction = mockSyncAction();

    const mockPrevState = {
        foo: 'bar',
    };

    const mockNextState = {
        foo: 'baz',
    };

    const spyGroup = jest.spyOn(console, 'group');
    const spyGroupEnd = jest.spyOn(console, 'groupEnd');
    const spyLog = jest.spyOn(console, 'log');

    beforeEach(() => {
        spyGroup.mockReset();
        spyGroupEnd.mockReset();
        spyLog.mockReset();
    });

    it('Should log the action to the console', () => {
        Logger.log(mockAction, mockPrevState, mockNextState);
        expect(spyGroup).toHaveBeenCalledWith(mockAction.type);
        expect(spyGroupEnd).toHaveBeenCalled();
        expect(spyLog).toHaveBeenCalled();

        expect(spyLog).toMatchSnapshot();
    });

    it(`Shouldn't log to the console when there's no action`, () => {
        Logger.log();
        expect(spyGroup).not.toHaveBeenCalled();
        expect(spyGroupEnd).not.toHaveBeenCalled();
        expect(spyLog).not.toHaveBeenCalled();
    });
});
