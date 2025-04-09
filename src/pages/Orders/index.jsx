import './Orders.scss'
import Layout from '../../components/Layout'
import useFetchData from '../../hooks/useFetchData'
import OrderCard from '../../components/OrderCard'
import StateFilter from '../../components/StateFilter'
import { useState } from 'react'

export default function Orders(){
    const { data: orders, loading, error } = useFetchData('/orders')
    const [statesToFilter, setStatesToFilter] = useState([])

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


    return(
        <Layout>
            <div className="orders">
                <h1>{formattedDate}</h1>
                <div className="options">
                    <button>Ver historial...</button>
                    <div className='filters'>
                        <StateFilter name={'IN_PROGRESS'} onClick={handleFilterState}/>
                        <StateFilter name={'PENDING'} onClick={handleFilterState}/>
                        <StateFilter name={'COMPLETED'} onClick={handleFilterState}/>
                    </div>
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