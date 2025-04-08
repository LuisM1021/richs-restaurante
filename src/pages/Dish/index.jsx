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
const apiUrl = import.meta.env.VITE_API_ENDPOINT

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

    const handleChangeDishName = async(id, newName) => {
        const updatedDish = await patch('/dishes', id, {
            name: newName
        })
        if(updatedDish){
            dispatch({
                type: 'changeName',
                nextName: updatedDish.name
            })
        }
        
    }

    const handleChangeDishDescription = async(id, newDescription) => {
        const updatedDish = await patch('/dishes', id, {
            description: newDescription
        })
        if(updatedDish){
            dispatch({
                type: 'changeDescription',
                nextDescription: updatedDish.description
            })
        }
    }

    const handleChangeDishCategory = async(categoryId) => {
        const updatedDish = await patch('/dishes', id, {
            categoryId: categoryId
        })
        if(updatedDish){
            dispatch({
                type: 'changeCategory',
                nextCategoryId: updatedDish.category.id
            })
        }
    }

    const handleChangeDishPrice = async(id, newPrice) => {
        const updatedDish = await patch('/dishes', id, {
            price: newPrice
        })
        if(updatedDish){
            dispatch({
                type: 'changePrice',
                nextPrice: updatedDish.price
            })
        }
    }

    return(
        <Layout>
            <div className="dish">
                <div className="dish__card">
                    <p className="card__name">{dish?.name}</p>
                    <img src={dish?.imageUrl ? `${apiUrl}/dishes/img${dish.imageUrl}` : fakeImg} alt={dish?.name} />
                    <p className="card__price">Q {parseFloat(dish?.price).toFixed(2)}</p>
                </div>
                <EditDishCard dish={dish} onChangeDishState={handleChangeIsActive} onUploadImage={handleUploadImage} onChangeName={handleChangeDishName} onChangeDescription={handleChangeDishDescription} onChangeCategory={handleChangeDishCategory} onChangePrice={handleChangeDishPrice}/>
            </div>
        </Layout>
    )

}