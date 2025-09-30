import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  const createProduct = async (productData) => {
    const newProduct = await addProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = async (id, product) => {
    const updatedProduct = await updateProduct(id, product);
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, createProduct, editProduct, removeProduct, loading }} 
    >
      {children}
    </ProductContext.Provider>
  );
};
