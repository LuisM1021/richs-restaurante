import './EditDishCard.scss'
import editIcon from '../../assets/edit.svg';
import { useState } from 'react';

export default function EditDishCard({ dish, onChangeDishState, onUploadImage }){

    const [file, setFile] = useState(null);
    const [showFileError, setShowFileError] = useState(false);

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

    return(
        <div className="edit-dish__card">
            <div className="edit__name">
                <p>{dish?.name}</p>
                <img src={editIcon} alt="Editar nombre" />
            </div>
            <div className="edit__description">
                <img src={editIcon} alt="Editar descripción" />
                <p>{dish?.description}</p>
            </div>
            <div className="edit__category">
                <p className='category__label'>Categoría: </p>
                <p>{dish?.category?.name}</p>
            </div>
            <div className="edit__price">
                <p className='price__label'>Precio:</p>
                <p>{dish?.price}</p>
                <img src={editIcon} alt="Editar descripción" />
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