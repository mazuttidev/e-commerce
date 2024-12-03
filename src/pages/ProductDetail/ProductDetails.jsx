import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from './productDetails.module.css'
import { CiTrash } from "react-icons/ci";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isCreating = (location.pathname === "/products/create");

    const [categories, setCategories] = useState([])

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    //busca categoria
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Erro ao carregar as categorias:", error);
            }
        };
        fetchCategories();
    }, []);

    //busca dados se for edit
    useEffect(() => {
        if (!isCreating) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    console.log(response)
                    setProduct(response.data);
                    console.log(product)
                } catch (error) {
                    console.error("Erro ao carregar os dados do produto:", error);
                }
            };
            fetchProduct();
        }
        setProduct({
            title: "",
            description: "",
            price: "",
            category: "",
            image: "",
        })
    }, [id, isCreating]);

    //atualiza o produto
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDelete = async () => {
        try {
                const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
                console.log("Produto Deletado: ", response);
                alert("Produto deletado com sucesso!");
                navigate("/products")
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
        }
    }

    //cria um produto
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isCreating) {
                const response = await axios.post("https://fakestoreapi.com/products", product);
                console.log("Produto Criado: ", response);
                alert("Produto criado com sucesso!");
            } else {
                const response = await axios.put(`https://fakestoreapi.com/products/${id}`, product);
                console.log("Produto atualizado: ", response);
                alert("Produto atualizado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao salvar/editar produto:", error);
        }
    };

    return (

        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <div className={styles.left}>
                    <img src={product.image === '' ? '' : product.image} alt={product.title} />
                </div>
                <div className={styles.rigth}>
                    {/* <label> */}
                    {/* Nome do Produto: */}
                    {/* </label> */}
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                    {/* <label> */}
                    {/* Descrição: */}
                    {/* </label> */}
                    <textarea
                        placeholder="Descrição do Produto..."
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                    {/* <label> */}
                    {/* Categoria: */}
                    {/* </label> */}
                    <select
                        id="exampleSelect"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {
                            categories.map((element, index) => (
                                <option value={element} key={index}>{element}</option>
                            ))
                        }
                    </select>
                    {/* <label> */}
                    {/* Preço: */}
                    {/* </label> */}
                    <input
                        placeholder="Valor do Produto"
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                    {/* <label> */}
                    {/* Imagem (URL): */}
                    {/* </label> */}
                    <input
                        placeholder="Informe a URL da Imagem"
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.btnContent}>
                        { !isCreating ? <button type="button" className={styles.deleteButton} title="Excluir" onClick={handleDelete}><CiTrash size={18} /></button> : <></>}
                        <button type="button" className={styles.cancelButton} onClick={() => navigate("/products")}>Cancelar</button>
                        <button type="submit" className={styles.saveButton} >Salvar</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default ProductDetail;
