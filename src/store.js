import { applyMiddleware, createStore } from 'redux';

import equinixViz from './state/reducers';

let store = createStore(equinixViz, applyMiddleware());
const { dispatch, getState, subscribe } = store;

export default store;
export { dispatch, getState, subscribe };
