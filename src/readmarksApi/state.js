import {
    READMARK_NAMESPACE,
    CONTEXT_READMARK_KEY,
} from './reducer';

function getContextReadmarkFromState(state) {
    const ns = state[READMARK_NAMESPACE];
    if (typeof(ns) === 'undefined') {
        return null;
    }

    return ns[CONTEXT_READMARK_KEY];
}

export {
    getContextReadmarkFromState
};