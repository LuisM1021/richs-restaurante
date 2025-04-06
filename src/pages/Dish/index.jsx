import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import './Dish.scss';
import { useEffect, useReducer } from 'react';
import fakeImg from '../../assets/nachos.svg';
import EditDishCard from '../../components/EditDishCard';
import usePatch from '../../hooks/usePatch';
import dishReducer from '../../reducers/dishReducer';
import useUploadImage from '../../hooks/useUploadImage';
import useFetchData from '../../hooks/useFetchData';

export default function Dish(){
    
    const { id } = useParams()
    const endpoint = id && !isNaN(parseInt(id)) ? `/dishes/${id}` : null;
    const { data: fetchedDish, loading, error } = useFetchData(endpoint)
    const [dish, dispatch] = useReducer(dishReducer, null)
    const { patch, loading: updateLoading, error: updateError } = usePatch()
    const { uploadImage, loading: imageLoading, error: imageError } = useUploadImage()

    useEffect(()=>{
        if(fetchedDish){
            dispatch({
                type: 'setObject',
                object: fetchedDish
            })
        }
    }, [fetchedDish])

    const handleChangeIsActive = async (id, newState) => {
        const updatedDish = await patch('/dishes', id, {
            isActive: newState
        })
        if(updatedDish){
            dispatch({
                type: 'changeIsActive',
                nextIsActive: updatedDish.isActive
            })
        }
    }

    const handleUploadImage = async (id, file) => {
        const result = await uploadImage(id, file)
        if(result){
            dispatch({
                type: 'changeImageUrl',
                nextImageUrl: result.url
            })
        }
    }

    return(
        <Layout>
            <div className="dish">
                <div className="dish__card">
                    <p className="card__name">{dish?.name}</p>
                    <img src={dish?.imageUrl ? `http://192.168.1.27:3000/api/dishes/img${dish.imageUrl}` : fakeImg} alt={dish?.name} />
                    <p className="card__price">Q {parseFloat(dish?.price).toFixed(2)}</p>
                </div>
                <EditDishCard dish={dish} onChangeDishState={handleChangeIsActive} onUploadImage={handleUploadImage}/>
            </div>
        </Layout>
    )

}