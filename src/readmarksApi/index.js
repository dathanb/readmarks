// This file is just here so the ReadmarksApi class can be imported easily, a la
// [Ducks](https://medium.com/building-crowdriff/react-redux-file-architecture-ducks-it-up-6b32eaaba341)

import ReadmarksApi from './ReadmarksApi';
import Context from './Context';
import {
    reducer,
    READMARKS_NAMESPACE,
    CONTEXT_READMARK_KEY,
} from './reducer';
import {
    getContextReadmarkFromState
} from './state';

export {
    ReadmarksApi,
    Context,
    reducer,
    READMARKS_NAMESPACE,
    CONTEXT_READMARK_KEY,
    getContextReadmarkFromState,
};
