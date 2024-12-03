import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";


function Products() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGridLayout, setIsGridLayout] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerCardsList}>
                    <div className={styles.left}></div>
                    <h4 className={styles.center}>Your Products</h4>
                    <div>
                        <button type="button" className={styles.right}>refresh</button>
                    </div>
                </div>
                <div className={styles.productsListContainer}>

                    {
                        isLoading ?
                            (
                                <p>Carregando Produtos...</p>
                            ) : (

                                <ProductCard products={products} isGridLayout={isGridLayout} />

                                // products.map(element => (
                                //     <ProductCard
                                //         key={element.id}
                                //         productId={element.id}
                                //         imageUrl={element.image}
                                //         productName={element.title}
                                //         description={element.description}
                                //         price={element.price}
                                //         isGridLayout={isGridLayout}
                                //     />
                                // ))
                            )
                    }

                </div>
            </div>
        </>
    )
}

export default Products