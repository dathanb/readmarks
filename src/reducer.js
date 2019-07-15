import {
    CURRENT_READMARK_NAMESPACE,
    reducer as currentReadmarkReducer,
} from './readmark';

import { combineReducers } from 'redux';

const composedReducer = combineReducers({[CURRENT_READMARK_NAMESPACE]: currentReadmarkReducer});

export default composedReducer;
