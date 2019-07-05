const initialState = {
  READMARK_STATE: 'UNRESOLVED'
};

function rootReducer(state = {}, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state
}

export { rootReducer }
