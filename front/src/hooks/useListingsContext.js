import { ListingsContext } from "../context/ListingsContext";
import { useContext } from 'react'


export const useListingsContext = () => {
    const context = useContext(ListingsContext)

    if (!context) {
        throw Error("useListingsContext must be used inside a ListingsContextProvider")
    }

    return context
}