import './Header.scss'
import dishPlate from '../../assets/dish.svg'
import orderBook from '../../assets/order-book.svg'

import Logo from '../Logo'


export default function Header(){
    return(
        <div className='header'>
            <div className='header__background'>
                <div className="background__box1"></div>
                <div className="background__box2"></div>
            </div>
            <nav className="header__nav">
                <ul className='nav__list'>
                    <li className='list__item'>
                        <p>Platos</p>
                        <img src={dishPlate} alt="Platos" />
                    </li>
                    <li className='list__logo-item'>
                        <Logo isGreen={true} flexDirection={'row'} />
                    </li>
                    <li className='list__item'>
                        <p>Pedidos</p>
                        <img src={orderBook} alt="Pedidos" />
                    </li>
                </ul>
            </nav>
        </div>
    )
}