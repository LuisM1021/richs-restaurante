import { useState } from "react";

export default function useUploadImage(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const uploadImage = async (id, file) => {
        const formData = new FormData();
        formData.append('image', file, file.name);
        setError(false)
        setLoading(true)

        try{
            const res = await fetch(`http://192.168.1.25:3000/api/dishes/img/${id}`,{
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