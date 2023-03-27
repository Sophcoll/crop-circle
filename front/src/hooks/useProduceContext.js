import { ProduceContext } from "../context/ProduceContext";
import { useContext } from 'react'


export const useProduceContext = () => {
    const context = useContext(ProduceContext)

    if (!context) {
        throw Error("useProduceContext must be used inside a ProduceContextProvider")
    }

    return context
}