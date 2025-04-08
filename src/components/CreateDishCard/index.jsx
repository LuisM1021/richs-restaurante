import './CreateDishCard.scss'
import useFetchData from '../../hooks/useFetchData';
import EditTextButtons from '../EditTextButtons';

import { useState } from 'react';

export default function EditDishCard({ dish, onChangeImage, onChangeName, onChangeDescription, onChangeCategory, onChangePrice, onCreateDish }){
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

    const handleChangeImage = () => {
        onChangeImage(file)
        setFile(null)
        setShowFileError(false)
    }

    const handleChangeName = () => {
        if(name !== ''){
            onChangeName(name);
        }
    }
    const handleChangeDescription = () => {
        if(description !== ''){
            onChangeDescription(description);
        }
    }
    const handleUpdatePrice = () => {
        if(price !== '' && !isNaN(parseFloat(price))){
            onChangePrice(price);
        }
    }
    const handleChangePrice = (value) => {
        // if(isNaN(parseInt(value)) && value !== '.'){
        //     setPrice(value)
        // }
        // return
        setPrice(value)
    }

    return(
        <div className="create-dish__card">
            <div className={`create__name ${enableEditName ? 'editing' : undefined}`}>
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
            <div className="create__description">
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
            <div className="create__category">
                <p className='category__label'>Categoría: </p>
                <select onChange={(e)=>{
                    if(parseInt(e.target.value) === -1){
                        onChangeCategory(null)
                    }else{
                        onChangeCategory(parseInt(e.target.value))
                    }
                }}>
                    <option value={-1}>Select a category</option>
                    { categories?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="create__price">
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
            <div className="create__file">
                <p className='file__label'>Imagen:</p>
                <input type="file" accept='.svg' onChange={(e) => handleChangeFile(e)}/>
                {showFileError && <p className="file__bad-source">Archivo no soportado</p> }
                {file &&  <button onClick={handleChangeImage}>Cambiar imagen</button> }
            </div>
            <div className="create__button">
                <button className={dish?.category?.id ? undefined : 'disabled'}
                 disabled={dish?.category?.id ? false : true}
                 onClick={onCreateDish}>
                    Crear
                </button>
            </div>
        </div>
    )
}