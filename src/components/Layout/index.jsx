import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


export default function Layout({ children}){
    return(
        <div className="layout">
            <header className='header__container'>
                <Header />
            </header>
            <main className='main__container'>
                {children}
            </main>
            <footer className='footer__container'>
                <Footer />
            </footer>
        </div>
    )
}