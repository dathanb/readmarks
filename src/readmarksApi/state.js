import {
    READMARKS_NAMESPACE,
    CONTEXT_READMARK_KEY,
    CONTEXT_READMARK_RESOLUTION_STATUS_KEY,
    CURRENT_URL_KEY,
} from './reducer';

function getContextReadmarkFromState(state) {
    const ns = state[READMARKS_NAMESPACE];
    if (typeof(ns) === 'undefined') {
        return null;
    }

    return ns[CONTEXT_READMARK_KEY];
}

function getContextReadmarkResolutionStatusFromState(state) {
    const ns = state[READMARKS_NAMESPACE];
    if (typeof (ns) === 'undefined') {
        return null;
    }

    return ns[CONTEXT_READMARK_RESOLUTION_STATUS_KEY];
}

function getCurrentUrlFromState(state) {
    const ns = state[READMARKS_NAMESPACE];
    if (typeof (ns) === 'undefined') {
        return null;
    }

    return ns[CURRENT_URL_KEY];
}

export {
    getContextReadmarkFromState,
    getContextReadmarkResolutionStatusFromState,
    getCurrentUrlFromState,
};