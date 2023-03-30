import { createContext, useReducer } from 'react';

export const ListingsContext = createContext();

export const listingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LISTINGS':
      return {
        listings: action.payload,
      };

    case 'CREATE_LISTING':
      return {
        listings: [action.payload, ...state.listings],
      };
    case 'DELETE_LISTINGS':
      return {
        listings: state.listings.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};
/* eslint-disable */
export const ListingsContextProvider = ({ children }) => {
  /* eslint-disable */
  const [state, dispatch] = useReducer(listingsReducer, {
    listings: null,
  });

  return (
    <ListingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListingsContext.Provider>
  );
};
