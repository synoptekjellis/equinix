import { applyMiddleware, createStore } from 'redux';

import wglSchemaEditor from './state/reducers';

let store = createStore(wglSchemaEditor, applyMiddleware());

const { dispatch, getState, subscribe } = store;

export default store;
export { dispatch, getState, subscribe };
