import React from "react";
import { Link } from "react-router-dom";
import styles from './footer.module.css'
import logo from '../../assets/img/porsche_logo.png'

function Footer() {

    return (
        <>
            <footer>
                <div className={styles.footerInfo}>
                    <div className={styles.footerAdress}>
                        <Link to="/">
                            <img src={logo} alt="nome loja" />
                        </Link>
                        <p>endereço vai aqui em baixo dfsdsdafsdafsadfasfasasdsfsadf sadfasd asdsadfsdasdsad</p>
                    </div>
                    <div className={styles.links}>
                        <ul>
                            <li><Link to="/" className={styles.colorPrimary}>Home</Link></li>
                            <li><Link to="/products" className={styles.colorPrimary}>Products</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copy}>
                    <p >&copy; 2024 Minha Loja. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;