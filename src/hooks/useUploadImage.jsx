import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function useUploadImage(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const uploadImage = async (id, file) => {
        const formData = new FormData();
        formData.append('image', file, file.name);
        setError(false)
        setLoading(true)

        try{
            const res = await fetch(`${apiUrl}/dishes/img/${id}`,{
                method: 'POST',
                body: formData
            })
            if(!res.ok){
                throw new Error(await res.json())
            }
            return await res.json()
        }catch(error){
            setError(true)
            console.error('Error uploading image: ', error)
            return null
        }finally{
            setLoading(false)
        }
    }
    return { uploadImage, loading, error }
}