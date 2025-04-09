import './DishCard.scss';
import { NavLink } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_ENDPOINT
import fakeImg from '../../assets/nachos.svg';

export default function DishCard({ dish }) {
    return(
        <NavLink to={`/dish/${dish.id}`}>
            <div className="dish-card">
                <figure className='dish-card__img-container'>
                    <p className={`dish-card__category cat_${dish.category.id}`}>{dish.category.name}</p>
                    <figure>
                        <img src={dish.imageUrl ? `${apiUrl}/dishes/img${dish.imageUrl}` : fakeImg} alt={dish.name} />
                    </figure>
                </figure>
                <p className='dish-card__dish-name'>{dish.name}</p>
                <p className="dish-card__dish-price">Q {parseFloat(dish.price).toFixed(2)}</p>
            </div>
        </NavLink>
    )    
}