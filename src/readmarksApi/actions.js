const GET_CURRENT_READMARK = "GET_CURRENT_READMARK";
const GET_CURRENT_READMARK_COMPLETE = "GET_CURRENT_READMARK_COMPLETE";

function getCurrentReadmark() {
    return {
        type: GET_CURRENT_READMARK
    };
}

function getCurrentReadmarkComplete(readmark) {
    return {
        type: GET_CURRENT_READMARK_COMPLETE,
        payload: readmark
    };
}

export {
    GET_CURRENT_READMARK,
    GET_CURRENT_READMARK_COMPLETE,
    getCurrentReadmark,
    getCurrentReadmarkComplete,
};

