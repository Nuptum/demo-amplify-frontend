import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ fetchProducts, productToEdit, setProductToEdit }) => {
  const [product, setProduct] = useState(
    productToEdit || {
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        await axios.put(
          `http://127.0.0.1:8000/products/${product.id}`,
          product
        );
      } else {
        await axios.post("http://127.0.0.1:8000/products/", product);
      }
      fetchProducts();
      setProductToEdit(null);
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={product.id}
        onChange={handleChange}
        required
        disabled={!!productToEdit}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">{productToEdit ? "Update" : "Add"} Product</button>
    </form>
  );
};

export default ProductForm;
