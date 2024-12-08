import React, { useEffect, useState } from "react";
import { CiGrid41, CiBoxList } from "react-icons/ci";
import { BiRefresh } from "react-icons/bi";
import axios from "axios";
import styles from "./products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";


function Products() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGridLayout, setIsGridLayout] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const localData = localStorage.getItem("products");
        if (localData) {
            setProducts(JSON.parse(localData));
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            localStorage.setItem("products", JSON.stringify(response.data));
            setProducts(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    const handleProductUpdate = (updatedProducts) => {
        setProducts(updatedProducts);
    };

    const handleCleanLocalStorage = () => {
        if (localStorage.getItem("products")) {
            localStorage.removeItem('products');
            setProducts([]);
            setIsLoading(true);
            console.log('Local Storage Limpo!');
        } else {
            console.log('Variável não encontrada!');
        }
        fetchProducts();
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerCardsList}>
                    <div className={styles.left} onClick={() => { setIsGridLayout(!isGridLayout) }}>{isGridLayout ? <CiBoxList size={28} /> : <CiGrid41 size={28} />}</div>
                    <h4 className={styles.center}>Produtos</h4>
                    <div className={styles.right}>
                        <BiRefresh size={28} title="Limpa todos os itens LocalStorage" onClick={handleCleanLocalStorage} />
                    </div>
                </div>
                <div className={styles.productsListContainer}>

                    {
                        isLoading ?
                            (
                                <p>Carregando Produtos...</p>
                            ) : (

                                <ProductCard products={products} isGridLayout={isGridLayout} onProductUpdate={handleProductUpdate}/>
                            )
                    }

                </div>
            </div>
        </>
    )
}

export default Products