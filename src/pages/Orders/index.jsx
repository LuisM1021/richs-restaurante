import './Orders.scss'
import Layout from '../../components/Layout'
import useFetchData from '../../hooks/useFetchData'
import OrderCard from '../../components/OrderCard'
import StateFilter from '../../components/StateFilter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalCreateOrder from '../../components/ModalCreateOrder'
import usePost from '../../hooks/usePost'

export default function Orders(){

    const navigate = useNavigate()
    const { data: orders, loading, error } = useFetchData('/orders')
    const [statesToFilter, setStatesToFilter] = useState([])
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false)
    const { post, error: errorPost, loading: loadingPost } = usePost()

    const filterOrders = () => {
        if(statesToFilter.length === 0){
            return orders
        }
        return orders?.filter(order => statesToFilter.includes(order.state));
    }

    const filteredOrders = filterOrders()

    const today = new Date()
    const formattedDate = today.toLocaleDateString('es-ES',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    )
    const handleFilterState = (state) => {
        if(statesToFilter.includes(state)){
            setStatesToFilter(statesToFilter.filter(stateToFilter => stateToFilter !== state))
            return
        }
        setStatesToFilter([...statesToFilter, state])
    }

    const handleCreateOrder = async (tableNumber) => {
        const createdOrder = await post('/orders', {
            tableNumber: tableNumber
        })
        if(createdOrder){
            navigate(`/order/${createdOrder.id}`)
        }
    }

    return(
        <Layout>
            <div className="orders">
                { showCreateOrderModal && <ModalCreateOrder onCloseModal={()=>setShowCreateOrderModal(false)} onConfirm={handleCreateOrder}/>}
                {/* <h1>{formattedDate}</h1> */}
                <div className="options">
                    <button>Ver historial...</button>
                    <div className='filters'>
                        <StateFilter name={'IN_PROGRESS'} onClick={handleFilterState}/>
                        <StateFilter name={'PENDING'} onClick={handleFilterState}/>
                        <StateFilter name={'COMPLETED'} onClick={handleFilterState}/>
                    </div>
                    <button className="orders__create-btn" onClick={() => setShowCreateOrderModal(true)}>Crear orden</button>
                </div>
                <div className="orders-list">
                    { filteredOrders?.map(order => (
                        <OrderCard key={order.id} order={order}/>
                    ))}
                </div>
            </div>
        </Layout>
    )
}