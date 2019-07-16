// This file is just here so the Readmark component can be imported easily, a la
// [Ducks](https://medium.com/building-crowdriff/react-redux-file-architecture-ducks-it-up-6b32eaaba341)

import {ReadmarkComponent} from './Readmark';
import {Readmark} from '../readmarksApi';
import CurrentReadmark from './CurrentReadmark'
import {
    CURRENT_READMARK_NAMESPACE,
    reducer
} from './reducer';

export {
    CurrentReadmark,
    ReadmarkComponent,
    Readmark,
    CURRENT_READMARK_NAMESPACE,
    reducer
};


