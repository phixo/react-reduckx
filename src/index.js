import createStore from './store';
import { createAsyncAction, createAsyncActionReducers } from './async';
import { combineReducers, createReducer, reduceWith } from './reducer';

const Reduckx = {
    combineReducers,
    createAsyncAction,
    createAsyncActionReducers,
    createReducer,
    createStore,
    reduceWith,
};

export {
    Reduckx as default,
    combineReducers,
    createAsyncAction,
    createAsyncActionReducers,
    createReducer,
    createStore,
    reduceWith,
};
