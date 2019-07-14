import {
    READMARKS_NAMESPACE,
    reducer as readmarksReducer,
} from './readmarksApi';

import { combineReducers } from 'redux';

const composedReducer = combineReducers({[READMARKS_NAMESPACE]: readmarksReducer});

export default composedReducer;
