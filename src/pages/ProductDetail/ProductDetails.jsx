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

    useEffect(() => {
        fetchProduct();
    }, [id, isCreating]);

    //busca dados se for edit
    const fetchProduct = async () => {
        if (!isCreating) {
            const localData = localStorage.getItem("products");
            let products = localData ? JSON.parse(localData) : [];

            const localProduct = products.find((item) => item.id === parseInt(id));

            if (localProduct) {
                setProduct(localProduct);
            } else {
                try {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error("Erro ao carregar os dados do produto:", error);
                }
            }
        } else {
            setProduct({
                title: "",
                description: "",
                price: "",
                category: "",
                image: "",
            });
        }
    };

    //atualiza o produto
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDelete = async () => {
        
        const localData = localStorage.getItem("products");
        if (localData) {
            const products = JSON.parse(localData);
            const atualizaProducts = products.filter((item) => item.id !== parseInt(id));
            localStorage.setItem("products", JSON.stringify(atualizaProducts));
            console.log("Produto removido da Local Storage!");
        } else {
            console.log("Produto não encontrado no Local Storage!");
        }
        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            console.log("Produto Deletado: ", response);
            alert("Produto deletado com sucesso!");
            navigate("/products");
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
        }
    }

    //cria um produto
    const handleSubmit = async (event) => {
        event.preventDefault();

        const localData = localStorage.getItem("products");
        let products = localData ? JSON.parse(localData) : [];

        if (isCreating) {
            const novoProduct = { ...product, id: Date.now() };
            products.push(novoProduct);
            localStorage.setItem("products", JSON.stringify(products));
            console.log("Adicionado no Local Storage:", novoProduct);

            try {
                const response = await axios.post("https://fakestoreapi.com/products", product);
                console.log("Produto criado:", response);
                alert("Produto criado com sucesso!");
                navigate("/products");
            } catch (error) {
                console.error("Erro ao criar produto:", error);
            }
        } else {
            products = products.map((elem) =>
                elem.id === parseInt(id) ? { ...elem, ...product } : elem
            );
            localStorage.setItem("products", JSON.stringify(products));
            console.log("Produto atualizado no Local Storage:", product);

            try {
                const response = await axios.put(`https://fakestoreapi.com/products/${id}`, product);
                console.log("Produto atualizado:", response);
                alert("Produto atualizado com sucesso!");
                navigate("/products");
            } catch (error) {
                console.error("Erro ao atualizar produto:", error);
            }
        }
    };


    return (

        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <div className={styles.left}>
                    <img src={product.image === '' ? '' : product.image} alt={product.title} />
                </div>
                <div className={styles.rigth}>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        placeholder="Descrição do Produto..."
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
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
                    <input
                        placeholder="Valor do Produto"
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="Informe a URL da Imagem"
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.btnContent}>
                        {!isCreating ? <button type="button" className={styles.deleteButton} title="Excluir" onClick={handleDelete}><CiTrash size={18} /></button> : <></>}
                        <button type="button" className={styles.cancelButton} onClick={() => navigate("/products")}>Cancelar</button>
                        <button type="submit" className={styles.saveButton} >Salvar</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default ProductDetail;
