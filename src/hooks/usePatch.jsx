import { useState } from "react"

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function usePatch(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const patch = async (endpoint, id, changes) => {
        setError(false)
        setLoading(true)
        try{
            const res = await fetch(`${apiUrl}${endpoint}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changes)
            })
            if(!res.ok){
                throw new Error(await res.json())
            }
            const data = await res.json()
            return data
    
        }catch(error){
            setError(true)
            console.error(`Error updating in ${endpoint}/${id}: `, error)
            return null
        }finally{
            setLoading(false)
        }
    }
    return { patch, loading, error }
}