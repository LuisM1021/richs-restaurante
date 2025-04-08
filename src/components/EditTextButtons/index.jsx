import './EditTextButtons.scss'
import editIcon from '../../assets/edit.svg';
import closeIcon from '../../assets/close.svg';
import checkIcon from '../../assets/check.svg';

export default function EditTextButtons({ enabledEdit, onEnableEdit, onCancelEdit, onSubmit }){
    if(enabledEdit){
        return (
            <div className='edit__buttons-container'>
                <img src={closeIcon} alt="Cancelar" onClick={onCancelEdit}/>
                <img src={checkIcon} alt="Confirmar" onClick={onSubmit}/>
            </div>
        )
    }
    return (
        <div className="edit__buttons-container">
            <img src={editIcon} alt="Editar nombre" onClick={onEnableEdit}/>
        </div>
    )
}