import {
    GET_CONTEXT_READMARK_COMPLETE,
    GET_CURRENT_URL_COMPLETE,
} from './actions';

const READMARKS_NAMESPACE = 'readmarks';
const CONTEXT_READMARK_KEY = 'contextReadmark';
const CONTEXT_READMARK_RESOLUTION_STATUS_KEY = 'contextReadmarkResolutionStatus';
const CURRENT_URL_KEY = 'currentUrl';

const INITIAL_STATE = {
    // This field can have one of three values: 'UNRESOLVED', 'RESOLVED', or 'MISSING'
    [CONTEXT_READMARK_RESOLUTION_STATUS_KEY]: 'UNRESOLVED',
};

function reducer(state, action) {
    if (typeof(state) === "undefined") {
        return INITIAL_STATE;
    }

    if (action.type === GET_CONTEXT_READMARK_COMPLETE) {
        if (typeof(action.error) === 'undefined') {
            // happy path
            return {
                ...state,
                [CONTEXT_READMARK_RESOLUTION_STATUS_KEY]: 'RESOLVED',
                [CONTEXT_READMARK_KEY]: action.payload,
            };
        } else {
            // TODO: also have a general-purpose error reducer that will pick up on this.
            return {
                ...state,
                [CONTEXT_READMARK_RESOLUTION_STATUS_KEY]: 'MISSING',
                [CONTEXT_READMARK_KEY]: null,
            };
        }
    } else if (action.type == GET_CURRENT_URL_COMPLETE) {
        if (typeof(action.error === 'undefined')) {
            return {
                ...state,
                [CURRENT_URL_KEY]: action.payload
            }
        }
        console.log(`Got an error loading the current url. Don't know how to recover from that. Error is: ${action.paylod}`);
    } else {
        console.log(`redmarksApi/reducer.js#reducer: Unrecognized action: ${action.type}`);
    }
    return state;
}

export {
    READMARKS_NAMESPACE,
    CONTEXT_READMARK_KEY,
    CONTEXT_READMARK_RESOLUTION_STATUS_KEY,
    CURRENT_URL_KEY,
    reducer,
}