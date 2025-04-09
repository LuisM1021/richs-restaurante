import './ModalAddDish.scss'
import SearchBar from '../SearchBar/SearchBar'
import useFetchData from '../../hooks/useFetchData'
import fakeImg from '../../assets/nachos.svg'
import { useRef, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

export default function ModalAddDish({ onCloseModal, onConfirm }){

    const { data: dishes, error, loading } = useFetchData('/dishes')
    const [search, setSearch] = useState('')
    const [selectedDishIndex, setSelectedDishIndex] = useState(0)
    const dishRef = useRef(null)

    const filterDishes = () => {
        if(search === ''){
            return dishes
        }
        return dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()))
    }

    const filteredDishes = filterDishes()

    const moveBackward = () => {
        let indexToMove
        if(selectedDishIndex === 0){
            setSelectedDishIndex(filteredDishes.length - 1)
        }else{
            indexToMove = selectedDishIndex - 1
            setSelectedDishIndex(selectedDishIndex - 1)
        }
        const node = dishRef.current?.querySelectorAll(".modal__dish")[indexToMove]
        node?.scrollIntoView({
            behavior: "smooth",
            block: 'nearest',
            inline: 'center'
        })
    }

    const moveForward = () => {
        let indexToMove
        if(selectedDishIndex === filteredDishes.length - 1){
            setSelectedDishIndex(0)
            indexToMove = 0
        }else{
            indexToMove = selectedDishIndex + 1
            setSelectedDishIndex(selectedDishIndex + 1)
        }
        
        const node = dishRef.current?.querySelectorAll(".modal__dish")[indexToMove]
        node?.scrollIntoView({
            behavior: "smooth",
            block: 'nearest',
            inline: 'center'
        })
    }

    const handleOnChange = (value) => {
        setSearch(value)
        setSelectedDishIndex(0)
    }

    const handleConfirmDish = async() => {
        const dishToAdd = filteredDishes.find((dish, i) => i === selectedDishIndex)
        if(dishToAdd){
            await onConfirm(dishToAdd.id)
            onCloseModal()
        }
    }


    return(
        <div className="modal__container">
            <div className="modal__add-dish">
                <h2>Agregar plato</h2>
                <div className="modal__search-bar">
                    <SearchBar onChange={handleOnChange}/>
                </div>
                <div className="modal__dishes">
                    <button className='dishes__backward' onClick={moveBackward}>{'<'}</button>
                    <button className='dishes__forward' onClick={moveForward}>{'>'}</button>
                    <ul className="dishes__carrousel" ref={dishRef}>
                        {filteredDishes?.map((dish, i) => (
                            <li className="modal__dish" key={i}>
                                <p>{dish.name}</p>
                                <figure>
                                    <img src={dish.imageUrl ? `${apiUrl}/dishes/img${dish.imageUrl}` : fakeImg} alt={dish.name} />
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal__buttons">
                    <button onClick={handleConfirmDish}>Confirmar</button>
                    <button onClick={onCloseModal}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}