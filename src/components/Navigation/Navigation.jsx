import React from "react";
import { Link } from "react-router-dom";
import styles from './navigation.module.css'
import logo from '../../assets/img/porsche_logo.png'

function Navigator() {

    return (
        <>
            <nav>
                <div className={styles.logoImg}>
                    <Link to="/">
                        <img src={logo} alt="nome loja" />
                    </Link>
                </div>
                <div className={styles.links}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/products/create" className={styles.btnCreate}>Criar Produto</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navigator;
