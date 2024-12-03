import React from "react";
import styles from "./home.module.css"
import homeImage from "../../assets/img/porsche-taycan-turbo-gt.jpg";

function Home() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.heroSession}>
                    <img src={homeImage} alt="Porsche taycan" />
                    <div className={styles.textInfo}>
                        <span>Concorra a uma</span>
                        <h1>Porsche Taycan Turbo</h1>
                        <span>Compras acima de R$ 20.000</span>
                    </div>
                </div>

                <div className={styles.carosselCards}>
                    <div className={styles.headerCarosselCards}>
                        <h4>Shop by Categories</h4>
                        <div>
                            <button type="button">--</button>
                            <button type="button">--</button>
                        </div>
                    </div>
                    <div className={styles.cards}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home