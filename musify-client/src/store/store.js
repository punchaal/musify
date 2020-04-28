// store.js
import React, { createContext, useReducer } from 'react';

const initialState = { profile: '', post: '' };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE':
        state.profile = action.payload;
        return state.profile;
      case 'UPDATE_POST':
        state.post = action.payload;
        return state.post;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
