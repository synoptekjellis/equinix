const initial = {
  active: {}
};

const reducers = {
  UPDATE_ACTIVE: (state, value) => {
    return {
      ...state,
      ...{ active: value }
    };
  }
};

const map = (state = initial, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action.value);
  }

  return state;
};

export default map;
