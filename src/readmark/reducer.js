import {
    GET_CURRENT_CONTEXT_READMARK_COMPLETE,
    GET_CURRENT_URL_COMPLETE,
} from './actions';

const CURRENT_READMARK_NAMESPACE = 'currenntReadmark';
const CURRENT_CONTEXT_KEY = 'currentContext';
const CURRENT_CONTEXT_READMARK_KEY = 'currentContextReadmark';
const CURRENT_CONTEXT_READMARK_STATUS_KEY = 'currentContextReadmarkStatus';
const CURRENT_URL_KEY = 'currentUrl';

const INITIAL_STATE = {
    // This field can have one of three values: 'UNRESOLVED', 'RESOLVED', or 'MISSING'
    [CURRENT_CONTEXT_READMARK_STATUS_KEY]: 'UNRESOLVED',
};

function reducer(state, action) {
    if (typeof (state) === "undefined") {
        return INITIAL_STATE;
    }

    if (action.type === GET_CURRENT_CONTEXT_READMARK_COMPLETE) {
        if (typeof (action.error) === 'undefined') {
            // happy path
            return {
                ...state,
                [CURRENT_CONTEXT_READMARK_STATUS_KEY]: 'RESOLVED',
                [CURRENT_CONTEXT_READMARK_KEY]: action.payload,
            };
        } else {
            // TODO: also have a general-purpose error reducer that will pick up on this.
            return {
                ...state,
                [CURRENT_CONTEXT_READMARK_STATUS_KEY]: 'MISSING',
                [CURRENT_CONTEXT_READMARK_KEY]: null,
            };
        }
    } else if (action.type === GET_CURRENT_URL_COMPLETE) {
        if (typeof (action.error === 'undefined')) {
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

function getCurrentContextReadmarkFromState(state) {
    const ns = state[CURRENT_READMARK_NAMESPACE];
    if (typeof (ns) === 'undefined') {
        return null;
    }

    return ns[CURRENT_CONTEXT_READMARK_KEY];
}

function getCurrentContextReadmarkStatusFromState(state) {
    const ns = state[CURRENT_READMARK_NAMESPACE];
    if (typeof (ns) === 'undefined') {
        return null;
    }

    return ns[CURRENT_CONTEXT_READMARK_STATUS_KEY];
}

function getCurrentUrlFromState(state) {
    const ns = state[CURRENT_READMARK_NAMESPACE];
    if (typeof (ns) === 'undefined') {
        return null;
    }

    return ns[CURRENT_URL_KEY];
}

export {
    CURRENT_READMARK_NAMESPACE,
    CURRENT_CONTEXT_READMARK_KEY,
    CURRENT_CONTEXT_READMARK_STATUS_KEY,
    CURRENT_URL_KEY,
    reducer,
    getCurrentContextReadmarkFromState,
    getCurrentContextReadmarkStatusFromState,
    getCurrentUrlFromState,
}