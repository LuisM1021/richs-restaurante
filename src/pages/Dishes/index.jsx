import './Dishes.scss';
import DishCard from '../../components/DishCard';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import AbcFilter from '../../components/AbcFilter/AbcFilter';
import useFetchData from '../../hooks/useFetchData';
import { NavLink } from 'react-router-dom';

export default function Dishes(){
    
    const { data: fetchedDishes, error, loading } = useFetchData('/dishes')
    const [dishes, setDishes] = useState([]);
    const [search, setSearch] = useState('');
    const [abcFilter, setAbcFilter] = useState('ALL');

    
    const filterDishes = () => {
        if(abcFilter !== 'ALL'){
            return dishes.filter(dish => dish.name[0].toLowerCase() === abcFilter.toLowerCase())
        }
        return search === '' ? dishes : dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()));
    }
    const filteredDishes = filterDishes()

    useEffect(()=>{
    
        if(fetchedDishes){
            setDishes(fetchedDishes)
        }    
    },[fetchedDishes])


    return(
        <Layout>
            <div className="dishes">
                <div className="dishes__filter-options">
                    <AbcFilter onChange={(value)=>setAbcFilter(value)}/>
                    <SearchBar onChange={(text)=>setSearch(text)}/>
                    <NavLink to='dish/create' className='dishes__create-btn'>Crear plato</NavLink>
                </div>

                <div className="dishes-list">
                    {filteredDishes.map((dish)=>(
                        <DishCard key={dish.id} dish={dish}/>
                    ))}
                </div>
            </div>
        </Layout>
    )
}