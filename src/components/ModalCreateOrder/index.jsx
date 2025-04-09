import './ModalCreateOrder.scss'
import { useState } from 'react'


export default function ModalCreateOrder({ onCloseModal, onConfirm }){

    const [tableNumber, setTableNumber] = useState(1)

    const handleConfirmDish = async () => {
        await onConfirm(tableNumber)
        onCloseModal()
    }

    return(
        <div className="modal__container">
            <div className="modal__create-order">
                <h2>Crear Orden</h2>
                <div className="modal__table-number">
                    <p>Mesa: </p>
                    <input type="number" defaultValue={1} min={1} max={24} onChange={(e)=>setTableNumber(parseInt(e.target.value))}/>
                </div>
                <div className="modal__buttons">
                    <button onClick={handleConfirmDish}>Confirmar</button>
                    <button onClick={onCloseModal}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}