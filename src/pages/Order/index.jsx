import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout'
import useFetchData from '../../hooks/useFetchData';
import './Order.scss'
import { useEffect, useReducer, useState } from 'react';
import orderReducer from '../../reducers/orderReducer';
import OrderDishItem from '../../components/OrderDishItem';
import add from '../../assets/add.svg'
import usePatch from '../../hooks/usePatch'
import useDelete from '../../hooks/useDelete';
import ModalAddDish from '../../components/ModalAddDish';

export default function Order(){

    const { id } = useParams()
    const endpoint = id && !isNaN(parseInt(id)) ? `/orders/${id}` : null;
    const { data: fetchedOrder, loading, error } = useFetchData(endpoint)
    const [order, dispatch] = useReducer(orderReducer, null)
    const { patch, error: patchError, loading: patchLoading } = usePatch()
    const { deleteRequest, error: deleteError, loading: loadingError } = useDelete()
    const [showAddDishModal, setShowAddDishModal] = useState(false)

    useEffect(()=>{
        if(fetchedOrder){
            dispatch({
                type: 'modifyOrder',
                object: fetchedOrder
            })
        }
    }, [fetchedOrder])

    const dateTime = new Date(order?.createdAt)

    const orderDate = dateTime.toLocaleDateString('es-ES',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    )
    const orderTime = dateTime.toLocaleTimeString('es-ES',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }
    )
    const total = order?.dishes?.reduce((sum, dish)=>{
        return sum + dish.price * dish.quantity
    }, 0)

    const handleChangeState = async (newState) => {

        const updatedOrder = await patch(`/orders`, order.id, {
            state: newState
        }) 
        if(updatedOrder){
            dispatch({
                type: 'changeState',
                nextState: updatedOrder.state
            })
        }
    }

    const handleChangeQuantity = async (dishId, newQuantity) => {
        const updatedOrder = await patch(`/orders/${order.id}/dishes`, dishId, {
            quantity: newQuantity
        }) 
        if(updatedOrder){
            dispatch({
                type: 'changeDishQuantity',
                dishId: updatedOrder.id,
                nextQuantity: updatedOrder.quantity
            })
        }
    }

    const handleRemoveDish = async (dishId) => {
        const result = await deleteRequest(`/orders/${order.id}/dishes/${dishId}`) 
        if(result.success){
            dispatch({
                type: 'removeDish',
                dishId: dishId,
            })
        }
    }

    return(
        <Layout>
            { showAddDishModal && <ModalAddDish onCloseModal={()=>setShowAddDishModal(false)}/>}
            <div className="order">
                <h1>Orden No. {order?.id}</h1>
                <div className="order__details">
                    <p><span>Fecha: </span>{orderDate}</p>
                    <p><span>Hora: </span>{orderTime}</p>
                    <p><span>Mesa: </span>{order?.tableNumber}</p>
                    <p>
                        <span>Estado: </span>
                        <select value={order?.state} onChange={(e)=>handleChangeState(e.target.value)}>
                            <option value="IN_PROGRESS">En progreso</option>
                            <option value="PENDING">Pendiente</option>
                            <option value="COMPLETED">Completada</option>
                        </select>
                    </p>
                </div>
                <div className="order__dishes-container">
                    <p>Items</p>
                    <div className="dishes-header">
                        <p>PLATO</p>
                        <p>CANTIDAD</p>
                        <p>PRECIO UNITARIO</p>
                        <p>TOTAL</p>
                    </div>
                    {order?.dishes?.map(dish => (
                        <>
                            <OrderDishItem key={dish.dishId} dish={dish} onChangeQuantity={handleChangeQuantity} onRemoveDish={handleRemoveDish}/>
                            <div className="line"></div>
                        </>
                    ))}
                    <div className="dishes__add" onClick={()=>setShowAddDishModal(true)}>
                        <p>Agregar</p>
                        <img src={add} alt="" />
                    </div>
                    <div className="dishes__total">
                        <p>Total: </p>
                        <p>Q {total?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}