const READMARKS_NAMESPACE = 'readmarks';
const CONTEXT_READMARK_KEY = 'contextReadmark';
const READMARK_RESOLUTION_STATUS_KEY = 'readmarkResolutionStatus';

const INITIAL_STATE = {
    [READMARK_RESOLUTION_STATUS_KEY]: 'UNRESOLVED',
};

function reducer(state, action) {
    if (typeof(state) === "undefined") {
        return INITIAL_STATE;
    }
    console.log(`redmarksApi/reducer.js#reducer: Unrecognized action: ${action}`);
    return state;
}

export {
    READMARKS_NAMESPACE,
    CONTEXT_READMARK_KEY,
    reducer,
}