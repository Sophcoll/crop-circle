import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const UseSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

// post the user email and password to the database (is listing the right route??)
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
 // if response is good save the users email and the webtoken to local storage from the userController in the backend
            localStorage.setItem('user', JSON.stringify(json))
// update auth context from the AuthContext Hook
            dispatch({ type: 'LOGIN', payload: json })
    // update loading state
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error}
} 
