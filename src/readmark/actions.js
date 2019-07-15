const GET_CURRENT_CONTEXT_READMARK = "GET_CURRENT_CONTEXT_READMARK";
const GET_CURRENT_CONTEXT_READMARK_COMPLETE = "GET_CURRENT_CONTEXT_READMARK_COMPLETE";

const GET_CURRENT_URL = "GET_CURRENT_URL";
const GET_CURRENT_URL_COMPLETE = "GET_CURRENT_URL_COMPLETE";


function getCurrentContextReadmark() {
    return {
        type: GET_CURRENT_CONTEXT_READMARK
    };
}

function getCurrentContextReadmarkComplete(readmark) {
    return {
        type: GET_CURRENT_CONTEXT_READMARK_COMPLETE,
        payload: readmark
    };
}

function getCurrentContextReadmarkError(error) {
    return {
        type: GET_CURRENT_CONTEXT_READMARK_COMPLETE,
        payload: error,
        error: true,
    };
}

function getCurrentUrl() {
    return {
        type: GET_CURRENT_URL
    };
}

function getCurrentUrlComplete(url) {
    return {
        type: GET_CURRENT_URL_COMPLETE,
        payload: url,
    };
}

function getCurrentUrlError(error) {
    return {
        type: GET_CURRENT_URL_COMPLETE,
        error: true,
        payload: error,
    };
}

export {
    GET_CURRENT_CONTEXT_READMARK,
    GET_CURRENT_CONTEXT_READMARK_COMPLETE,
    getCurrentContextReadmark,
    getCurrentContextReadmarkComplete,
    getCurrentContextReadmarkError,

    GET_CURRENT_URL,
    GET_CURRENT_URL_COMPLETE,
    getCurrentUrl,
    getCurrentUrlComplete,
    getCurrentUrlError,
};

