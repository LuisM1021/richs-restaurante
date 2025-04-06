import { useEffect, useState } from "react"

export default function useFetchData(endpoint){

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if(!endpoint){
            setError(true)
            return
        }
        let ignore = false
        setLoading(true)
        setError(false)
        const fetchData = async () => {
        
            try{
                const res = await fetch(`http://192.168.1.27:3000/api${endpoint}`)
                if(!res.ok){
                    throw new Error(await res.json())
                }
                const data = await res.json()
                if(!ignore){
                    setData(data)
                }
            }catch(error){
                if(!ignore){
                    setError(true)
                }
                console.error('Error fetching data: ', error)
                return null
            }finally{
                if(!ignore){
                    setLoading(false)
                }
            }
        }

        fetchData()
        return () => {
            ignore = true
        }
    }, [endpoint])
    
    return { loading, error, data }
}