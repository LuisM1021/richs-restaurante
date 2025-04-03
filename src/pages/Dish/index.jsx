import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import './Dish.scss';
import { useEffect, useState } from 'react';
import fakeImg from '../../assets/nachos.svg';
import EditDishCard from '../../components/EditDishCard';

export default function Dish(){

    const [dish, setDish] = useState(null);

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isNaN(parseInt(id))){
            navigate('/')
            return
        }
    },[id, navigate])

    useEffect(()=>{
        let ignore = false;

        fetch(`http://localhost:3000/api/dishes/${id}`)
        .then(res => res.json())
        .then(data => {
            if(!ignore){
                if(data.statusCode === 404){
                    navigate('/')

                }else{
                    setDish(data);
                }
            }
        }).catch(error => console.log('Error: ', error))
        return () => {
            ignore = true;
        }
    }, [id, navigate])

    const handleChangeIsActive = (id, newState) => {
        fetch(`http://localhost:3000/api/dishes/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isActive: newState
                })
            }
        ).then(res => {
            if(!res.ok){
                throw new Error('Error: ', res.status);
            }
            return res.json()
        })
        .then(updatedDish => {
            setDish(prev => ({
                ...prev,
                isActive: updatedDish.isActive
            }))
        }).catch(error => console.log('An error occured changing the state: ', error))
    }

    const handleUploadImage = (id, file) => {
        console.log('Llego file: ', file)
        const formData = new FormData();
        formData.append('image', file, file.name);

        fetch(`http://localhost:3000/api/dishes/img/${id}`, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if(!res.ok){
                throw new Error('Error: ', res.status)
            }
            return res.json();
        })
        .then(result => {
            setDish(prev => ({
                ...prev,
                imageUrl: result.url
            }))
        }).catch(error => console.log('Error uploading image: ', error))
    }

    return(
        <Layout>
            <div className="dish">
                <div className="dish__card">
                    <p className="card__name">{dish?.name}</p>
                    <img src={dish?.imageUrl ? `http://localhost:3000/api/dishes/img${dish.imageUrl}` : fakeImg} alt={dish?.name} />
                    <p className="card__price">Q {parseFloat(dish?.price).toFixed(2)}</p>
                </div>
                <EditDishCard dish={dish} onChangeDishState={handleChangeIsActive} onUploadImage={handleUploadImage}/>
            </div>
        </Layout>
    )

}