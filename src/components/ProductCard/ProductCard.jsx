import React, { useEffect } from "react";
import styles from "./productCard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard({ products, isGridLayout}) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/products/edit/${products.id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${products.id}`);
            console.log("Produto Deletado: ", response);
            alert("Produto deletado com sucesso!");
            navigate("/products")
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
        }
    }
    return (

        (isGridLayout) ? (

            <>
                {
                    products.map(element => (
                        <div className={styles.myCard}>
                            <div className={styles.imageContent}>
                                <img src={element.image} alt={element.title} />
                                <div className={styles.bntGroup}>
                                    <button type="button" className={styles.deleteButton} onClick={handleDelete}>Excluir Item</button>
                                    <button type="button" className={styles.editButton} onClick={handleEdit}>Editar Item</button>
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <h4>{element.title}</h4>
                                <p title={element.description}>{element.description}</p>
                                <span>R$ {element.price}</span>
                            </div>
                        </div>

                    ))
                }

            </>

        ) : (

            <>
                <div className={styles.listContainer}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Product ID</th>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Image</th>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Description</th>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
                                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Is Grid Layout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId}>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        {product.productId}
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        <img src={product.imageUrl} alt={product.productName} width="50" />
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        {product.productName}
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        {product.description}
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        {product.price}
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        {product.isGridLayout ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>

        )
    )
}

export default ProductCard;