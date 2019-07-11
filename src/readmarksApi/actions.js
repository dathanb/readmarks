const GET_CONTEXT_READMARK = "GET_CONTEXT_READMARK";
const GET_CONTEXT_READMARK_COMPLETE = "GET_CONTEXT_READMARK_COMPLETE";

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

export {
    GET_CONTEXT_READMARK,
    GET_CONTEXT_READMARK_COMPLETE,
    getContextReadmark,
    getContextReadmarkComplete,
};

