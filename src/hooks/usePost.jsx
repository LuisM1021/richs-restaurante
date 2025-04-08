import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function usePost(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const post = async (endpoint, content) => {
        setLoading(true)
        setError(false)
        try {
            const res = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content)
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
    return { post, loading, error }
}