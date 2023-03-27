import { createContext, useReducer } from "react";

export const ProduceContext = createContext();

export const produceReducer = (state, action) => {
      switch(action.type) {
        case 'SET_PRODUCE':
            return {
            produce: action.payload
            }
        
        case 'CREATE_PRODUCE':
            return {
            produce: [action.payload, ...state.produce]
            }
        case 'DELETE_PRODUCE': 
            return {
                produce: state.produce.filter((w) => w._id !==action.payload._id)
            }
    default: 
        return state 
    }
}

export const ProduceContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(produceReducer, {
        produce: null
    })

    return (
        <ProduceContext.Provider value={{...state, dispatch }}>
            { children }
        </ProduceContext.Provider>
    )
}