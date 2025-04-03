import './SearchBar.scss';
import searchIcon from '../../assets/search.svg';
import { useState } from 'react';

export default function SearchBar({onChange}){

    const [showInput, setShowInput] = useState(true);

    return(
        <div className="search-bar">
            <input type='text' onChange={(e)=>onChange(e.target.value)}/>
            <figure className="search-bar__icon">
                <img src={searchIcon} alt="Buscar" />
            </figure>
        </div>
    )
}