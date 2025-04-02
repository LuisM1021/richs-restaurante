import './Footer.scss';

import Logo from '../Logo';

import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';

export default function Footer(){
    return(
        <div className="footer">
            <Logo isGreen={false} flexDirection={'row'} />
            <div className="footer__contact">
                <p>Contacto</p>
                <p>Teléfono: 12345678</p>
                <p>Correo: example@gmail.com</p>
            </div>
            <div className="footer__social">
                <p>Redes Sociales</p>
                <div className='social__icons'>
                    <img src={twitter} alt="Twitter" />
                    <img src={facebook} alt="Facebook" />
                    <img src={instagram} alt="Instagram" />'
                </div>
            </div>
        </div>
    )
}