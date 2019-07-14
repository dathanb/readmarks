const GET_CONTEXT_READMARK = "GET_CONTEXT_READMARK";
const GET_CONTEXT_READMARK_COMPLETE = "GET_CONTEXT_READMARK_COMPLETE";

const GET_CURRENT_URL = "GET_CURRENT_URL";
const GET_CURRENT_URL_COMPLETE = "GET_CURRENT_URL_COMPLETE";


function getContextReadmark() {
    return {
        type: GET_CONTEXT_READMARK
    };
}

function getContextReadmarkComplete(readmark) {
    return {
        type: GET_CONTEXT_READMARK_COMPLETE,
        payload: readmark
    };
}

function getContextReadmarkError(error) {
    return {
        type: GET_CONTEXT_READMARK_COMPLETE,
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
    GET_CONTEXT_READMARK,
    GET_CONTEXT_READMARK_COMPLETE,
    getContextReadmark,
    getContextReadmarkComplete,
    getContextReadmarkError,

    GET_CURRENT_URL,
    GET_CURRENT_URL_COMPLETE,
    getCurrentUrl,
    getCurrentUrlComplete,
    getCurrentUrlError,
};

