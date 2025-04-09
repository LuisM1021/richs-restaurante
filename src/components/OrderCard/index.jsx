import { NavLink } from 'react-router-dom'
import './OrderCard.scss'

export default function OrderCard({ order, onClick }){

    let state
    if(order?.state === 'IN_PROGRESS') state = 'En progreso...'
    if(order?.state === 'COMPLETED') state = 'Completada'
    if(order?.state === 'PENDING') state = 'Pendiente'

    return(
        <NavLink to={`/order/${order?.id}`}>
            <div className={`order-card ${order?.state}`} onClick={onClick}>
                <p>#{order?.id}</p>
                <p>Mesa {order?.tableNumber}</p>
                <p>{state}</p>
            </div>
        </NavLink>
    )
}