import './DishCard.scss';

import fakeImg from '../../assets/nachos.svg';

export default function DishCard({ dish }) {
    return(
        <div className="dish-card">
            <figure className='dish-card__img-container'>
                <p>{dish.category.name}</p>
                <img src={dish.imageUrl ? `http://localhost:3000/api/dishes/img${dish.imageUrl}` : fakeImg} alt={dish.name} />
            </figure>
            <p className='dish-card__dish-name'>{dish.name}</p>
            <p className="dish-card__dish-price">Q {parseFloat(dish.price).toFixed(2)}</p>
        </div>
    )    
}