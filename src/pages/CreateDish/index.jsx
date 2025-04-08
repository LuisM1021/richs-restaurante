import { useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import './CreateDish.scss';

import fakeImg from '../../assets/nachos.svg';
import CreateDishCard from '../../components/CreateDishCard';
import dishReducer from '../../reducers/dishReducer';
import usePost from '../../hooks/usePost';
import useUploadImage from '../../hooks/useUploadImage';
import { useNavigate } from 'react-router-dom';


export default function CreateDish(){
    
    const { post, loading: loadingCreatingDish, error: errorCreatingDish } = usePost()
    const { uploadImage, loading: loadingImage, error: errorImage } = useUploadImage()
    const [dish, dispatch] = useReducer(dishReducer, initialDish)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileLoaded, setImageFileLoaded] = useState(null)
    const navigate = useNavigate()

    const handleChangeImage = (file) => {
        if(file){
            setImageFileLoaded(file)
            const reader = new FileReader()
            reader.onloadend = () =>{
                setImageFile(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChangeDishName = (nextName) => {
        dispatch({
            type: 'changeName',
            nextName: nextName
        })
    }

    const handleChangeDescription = (nextDescription) => {
        dispatch({
            type: 'changeDescription',
            nextDescription: nextDescription
        })
    }

    const handleChangeCategory = (nextCategory) => {
        dispatch({
            type: 'changeCategory',
            nextCategoryId: nextCategory
        })
    }

    const handleChangePrice = (nextPrice) => {
        dispatch({
            type: 'changePrice',
            nextPrice: nextPrice
        })
    }

    const handleCreateDish = async() => {
        const createdDishId = await post('/dishes', {
             name: dish.name, 
             description: dish.description,
             price: dish.price,
             categoryId: dish.category.id
        })
        if(!createdDishId){
            return null
        }
        if(imageFileLoaded){
            await uploadImage(createdDishId.id, imageFileLoaded)
        }
        navigate(`/dish/${createdDishId.id}`)
    }

    return(
        <Layout>
            <div className="dish">
                <div className="dish__card">
                    <p className="card__name">{dish?.name}</p>
                    <img src={imageFile ? imageFile : fakeImg} alt={dish?.name} />
                    <p className="card__price">Q {parseFloat(dish?.price).toFixed(2)}</p>
                </div>
                <CreateDishCard dish={dish} onChangeImage={handleChangeImage} onChangeName={handleChangeDishName} onChangeDescription={handleChangeDescription} onChangeCategory={handleChangeCategory} onChangePrice={handleChangePrice} onCreateDish={handleCreateDish}/>
            </div>
        </Layout>
    )
}

const initialDish = {
    name: 'Nuevo Plato',
    description: 'Descripción',
    price: 1,
    category: null
}