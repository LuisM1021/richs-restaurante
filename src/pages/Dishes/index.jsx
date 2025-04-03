import './Dishes.scss';
import DishCard from '../../components/DishCard';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import AbcFilter from '../../components/AbcFilter/AbcFilter';

export default function Dishes(){
    
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
    
            let ignore = false;
    
            console.log("Consultando API")
            fetch("http://localhost:3000/api/dishes")
            .then((response) => response.json())
            .then((data) => {
                if(!ignore){
                    setDishes(data);
                }
            }).catch((error) => console.log('Error: ', error));
    
            return () => {
                ignore = true;
            }
    
        },[])


    return(
        <Layout>
            <div className="dishes">
                <div className="dishes__filter-options">
                    <AbcFilter onChange={(value)=>setAbcFilter(value)}/>
                    <SearchBar onChange={(text)=>setSearch(text)}/>
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