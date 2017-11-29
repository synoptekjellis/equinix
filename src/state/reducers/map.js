const initial = {
  active: {},
  activeTest: {}
};

const reducers = {
  UPDATE_ACTIVE: (state, value) => {
    return {
      ...state,
      ...{ active: value }
    };
  },
  UPDATE_ACTIVE_TEST: (state, value) => {
    return {
      ...state,
      ...{ activeTest: value }
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
