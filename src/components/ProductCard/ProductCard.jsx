import React, { useEffect } from "react";
import styles from "./productCard.module.css";
import { useNavigate } from "react-router-dom";
import { CiEdit, CiTrash } from "react-icons/ci";
import axios from "axios";

function ProductCard({ products, isGridLayout, onProductUpdate }) {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const localData = localStorage.getItem("products");
        if (localData) {
            const products = JSON.parse(localData);
            const updatedProducts = products.filter((item) => item.id !== parseInt(id));
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            onProductUpdate(updatedProducts);
            console.log("Produto removido da Local Storage!");
        } else {
            console.log("Produto não encontrado no Local Storage!");
        }

        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            console.log("Produto Deletado: ", response);
            alert("Produto deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
        }
    };

    return (

        (isGridLayout) ? (

            <>
                {
                    products.map(element => (
                        <div key={element.id} className={styles.myCard}>
                            <div className={styles.imageContent}>
                                <img src={element.image} alt={element.title} />
                                <div className={styles.bntGroup}>
                                    <button type="button" className={styles.deleteButton} onClick={() => handleDelete(element.id)}>Excluir Item</button>
                                    <button type="button" className={styles.editButton} onClick={() => handleEdit(element.id)}>Editar Item</button>
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
                                <th></th>
                                <th>Nome</th>
                                <th>Imagem</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className={styles.alCenter}>
                                        <CiEdit color="blue" size={32} onClick={() => handleEdit(product.id)} className={styles.icon} />
                                    </td>
                                    <td>
                                        {product.id} - {product.title}
                                    </td>
                                    <td className={styles.alCenter}>
                                        <img src={product.image} alt={product.title} width="50" />
                                    </td>
                                    <td>
                                        {product.description}
                                    </td>
                                    <td className={styles.price}>
                                        R$ {product.price}
                                    </td>
                                    <td className={styles.alCenter}>
                                        <CiTrash color="rgba(139, 27, 33)" size={32} onClick={() => handleDelete(product.id)} className={styles.icon} />
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