import useFetchData from '../../hooks/useFetchData';
import EditTextButtons from '../EditTextButtons';
import './EditDishCard.scss'

import { useState } from 'react';

export default function EditDishCard({ dish, onChangeDishState, onUploadImage, onChangeName, onChangeDescription, onChangeCategory, onChangePrice }){
    const { data: categories, error, loading } = useFetchData('/dishes/categories');
    const [file, setFile] = useState(null);
    const [showFileError, setShowFileError] = useState(false);
    const [enableEditName, setEnableEditName] = useState(false);
    const [enableEditDescription, setEnableEditDescription] = useState(false);
    const [enableEditPrice, setEnableEditPrice] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        if(!file){
            setShowFileError(false)
            setFile(null)
            return
        }
        if(!/.*\.svg/.test(file.name)){
            setShowFileError(true)
            e.target.value = ''
            setFile(null)
            return
        }
        setShowFileError(false)
        setFile(file)
    }

    const handleUploadFile = async () => {
        await onUploadImage(dish?.id, file)
        setFile(null)
        setShowFileError(false)
    }

    const handleChangeName = () => {
        if(name !== ''){
            onChangeName(dish?.id, name);
        }
    }
    const handleChangeDescription = () => {
        if(description !== ''){
            onChangeDescription(dish?.id, description);
        }
    }
    const handleUpdatePrice = () => {
        onChangePrice(dish?.id, price);
        // if(price !== '' && !isNaN(parseFloat(price))){
        // }
    }
    const handleChangePrice = (value) => {
        // if(isNaN(parseInt(value)) && value !== '.'){
            setPrice(value)
        // }
        // return
    }

    return(
        <div className="edit-dish__card">
            <div className={`edit__name ${enableEditName ? 'editing' : undefined}`}>
                { enableEditName ? 
                    <input type="text" placeholder={dish?.name} onChange={(e)=>setName(e.target.value)}/>
                    :
                    <p>{dish?.name}</p>
                }
                <EditTextButtons enabledEdit={enableEditName} onEnableEdit={()=>setEnableEditName(true)} onCancelEdit={()=>setEnableEditName(false)} onSubmit={()=>{
                    handleChangeName()
                    setEnableEditName(false)
                }}/>
            </div>
            <div className="edit__description">
                <EditTextButtons enabledEdit={enableEditDescription} onEnableEdit={()=>setEnableEditDescription(true)} onCancelEdit={()=>setEnableEditDescription(false)} 
                onSubmit={() => {
                    handleChangeDescription()
                    setEnableEditDescription(false)
                }}/>
                { enableEditDescription ?
                    <textarea placeholder={dish?.description} onChange={(e)=>setDescription(e.target.value)}/>
                    :
                    <p>{dish?.description}</p>
                }
            </div>
            <div className="edit__category">
                <p className='category__label'>Categoría: </p>
                <select value={dish?.category?.id} onChange={(e)=>onChangeCategory(e.target.value)}>
                    { categories?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="edit__price">
                <p className='price__label'>Precio:</p>
                { enableEditPrice ? 
                    <input type="text" placeholder={dish?.price} onChange={(e)=>handleChangePrice(e.target.value)}/>
                    :
                    <p>{dish?.price}</p>
                }
                <EditTextButtons enabledEdit={enableEditPrice} onEnableEdit={()=>setEnableEditPrice(true)} onCancelEdit={()=>setEnableEditPrice(false)} 
                onSubmit={()=>{
                    handleUpdatePrice()
                    setEnableEditPrice(false)
                }}/>
            </div>
            <div className="edit__file">
                <p className='file__label'>Imagen:</p>
                <input type="file" accept='.svg' onChange={(e) => handleChangeFile(e)}/>
                {showFileError && <p className="file__bad-source">Archivo no soportado</p> }
                {file &&  <button onClick={handleUploadFile}>Cambiar imagen</button> }
            </div>
            <div className="edit__is-active">
                <button className={dish?.isActive ? 'active': undefined} onClick={() => onChangeDishState(dish?.id, !dish?.isActive)}>
                    {dish?.isActive ? 'Desactivar' : 'Activar'}
                </button>
            </div>
        </div>
    )
}