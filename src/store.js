// store.js

import { createStore } from 'redux';
import rootReducer from './reducers'; // Agar reducer lar mavjud bo'lsa

const store = createStore(rootReducer); // rootReducer ga e'tibor bering

export default store;