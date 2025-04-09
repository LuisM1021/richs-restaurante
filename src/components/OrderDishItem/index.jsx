import './OrderDishItem.scss'

import fakeImage from '../../assets/nachos.svg'
import minus from '../../assets/minus.svg'
import add from '../../assets/add.svg'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function OrderDishItem({ dish, onChangeQuantity, onRemoveDish }){
    
    const total = dish.price * dish.quantity

    const handleQuitOneDish = () => {
        if(dish.quantity !== 1){
            onChangeQuantity(dish.dishId, dish.quantity - 1)
        }
    }

    return(
        <div className="order-dish__item">
            <div className="item__card">
                <div>
                    <p>{dish.name}</p>
                    <button onClick={()=>onRemoveDish(dish.dishId)}>Eliminar</button>
                </div>
                <img src={dish.imageUrl ? `${apiUrl}/dishes/img/${dish.imageUrl}` : fakeImage} alt="" />
            </div>
            <div className="item__quantity">
                <button onClick={handleQuitOneDish}><img src={minus} alt="" /></button>
                <p>{dish.quantity}</p>
                <button onClick={()=>onChangeQuantity(dish.dishId, dish.quantity + 1)}><img src={add} alt="" /></button>
            </div>
            <p>Q {parseFloat(dish.price).toFixed(2)}</p>
            <p>Q {total.toFixed(2)}</p>
        </div>
    )
}