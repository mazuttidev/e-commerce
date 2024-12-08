import React, { useState } from "react";
import styles from "./home.module.css"
import heroImage from "../../assets/img/porsche-taycan-turbo-gt.jpg";

function Home() {
    const [isOpacity, setIsOpacity] = useState(true)

    return (
        <>
            <div className={styles.container}>
                <div className={isOpacity ? styles.heroSession : styles.heroSessionHover} onMouseEnter={() => { isOpacity ? setIsOpacity(false) : '' }}>
                    <img src={heroImage} alt="Porsche taycan" />
                    <div className={styles.textInfo}>
                        <span>Concorra a uma</span>
                        <h1>Porsche Taycan Turbo</h1>
                        <span className={styles.fontSmall}>Compras acima de R$ 20.000,00</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home