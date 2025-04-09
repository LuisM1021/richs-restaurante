import './ModalAddDish.scss'
import SearchBar from '../SearchBar/SearchBar'
import useFetchData from '../../hooks/useFetchData'
import fakeImg from '../../assets/nachos.svg'

export default function ModalAddDish({ onCloseModal, onConfirm }){

    const { data: dishes, error, loading } = useFetchData('/dishes')

    console.log(dishes)

    return(
        <div className="modal__container">
            <div className="modal__add-dish">
                <h2>Agregar plato</h2>
                <div className="modal__search-bar">
                    <SearchBar />
                </div>
                <div className="modal__dishes">
                    {dishes?.map(dish => (
                        <div className="modal__dish">
                            <p>{dish.name}</p>
                            <figure>
                                <img src={dish.imageUrl ? dish.imageUrl : fakeImg} alt={dish.name} />
                            </figure>
                        </div>
                    ))}
                </div>
                <div className="modal__buttons">
                    <button>Confirmar</button>
                    <button onClick={onCloseModal}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}