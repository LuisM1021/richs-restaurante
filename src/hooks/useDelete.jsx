import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function useDelete(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const deleteRequest = async (endpoint) => {
        setLoading(true)
        setError(false)
        try {
            const res = await fetch(`${apiUrl}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!res.ok){
                throw new Error(await res.json())
            }
            const data = await res.json()
            return data
            
        } catch (error) {
            setError(true)
            console.error(`Error posting in : ${apiUrl}${endpoint}`, error)
            return null
        }finally{
            setLoading(false)
        }
        
    }
    return { deleteRequest, loading, error }
}