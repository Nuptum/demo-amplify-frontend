import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductApp = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/products/");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Manager</h1>
      <ProductForm
        fetchProducts={fetchProducts}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
      />
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        setProductToEdit={setProductToEdit}
      />
    </div>
  );
};

export default ProductApp;
