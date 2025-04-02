import './Logo.scss';

import logo from '../../assets/richs-logo.svg';

export default function Logo({ isGreen, flexDirection }) {

    let colorClassname = isGreen ? 'green' : 'blue';

    return(
        <figure className={`logo__container ${flexDirection}`}>
            <img src={logo} alt="Logo Rich's" />
            <p className={colorClassname}>Rich's</p>
        </figure>
    )
}