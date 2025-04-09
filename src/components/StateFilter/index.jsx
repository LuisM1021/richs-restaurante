import './StateFilter.scss'
import checkIcon from '../../assets/check.svg'
import closeIcon from '../../assets/close.svg'
import { useState } from 'react'

export default function StateFilter({ name, onClick }){

    const [selected, setSelected] = useState(false)

    let state
    if(name === 'IN_PROGRESS') state = 'En progreso...'
    if(name === 'COMPLETED') state = 'Completada'
    if(name === 'PENDING') state = 'Pendiente'

    return(
        <div className='state__filter'>
            <button className={name}>{state}</button>
            <figure onClick={() => {
                setSelected(!selected)
                onClick(name)
            }}>
                <img src={selected ? closeIcon : checkIcon} alt="" />
            </figure>
        </div>
    )
}