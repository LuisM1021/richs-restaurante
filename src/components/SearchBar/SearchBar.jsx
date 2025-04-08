import './SearchBar.scss';
import searchIcon from '../../assets/search.svg';
import { useState } from 'react';

export default function SearchBar({onChange}){

    const [showInput, setShowInput] = useState(true);

    return(
        <div className={`search-bar ${showInput ? 'search-bar--show-input' : undefined}`}>
            <input type='text' onChange={(e)=>onChange(e.target.value)}/>
            <figure className="search-bar__icon" onClick={()=>setShowInput(!showInput)}>
                <img src={searchIcon} alt="Buscar" />
            </figure>
        </div>
    )
}