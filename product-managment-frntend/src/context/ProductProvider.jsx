// import React, { createContext, useReducer, useEffect } from "react";
// import { v4 as uuid } from "uuid";

// // Dummy initial products
// const initialProducts = [
//   {
//     id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//   {
//     id: uuid(),
//     name: "Smartphone",
//     price: 800,
//     stock: 10,
//     image: "https://via.placeholder.com/150",
//     description: "<p>Latest model smartphone.</p>",
//   },
//   {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
//    {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   }, {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   }, {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   }, {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   }, {
//    id: uuid(),
//     name: "Laptop",
//     price: 1200,
//     stock: 5,
//     image: "https://via.placeholder.com/150",
//     description: "<p>High performance laptop.</p>",
//   },
// ];

// export const ProductContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_PRODUCT":
//       return [...state, action.payload];
//     case "UPDATE_PRODUCT":
//       return state.map((p) =>
//         p.id === action.payload.id ? action.payload : p
//       );
//     case "DELETE_PRODUCT":
//       return state.filter((p) => p.id !== action.payload);
//     default:
//       return state;
//   }
// };

// export const ProductProvider = ({ children }) => {
//   const [products, dispatch] = useReducer(reducer, initialProducts, () => {
//     const localData = localStorage.getItem("products");
//     return localData ? JSON.parse(localData) : initialProducts;
//   });

//   // Persist to localStorage
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   return (
//     <ProductContext.Provider value={{ products, dispatch }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

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

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createProduct = async (productData) => {
      const newProduct = await addProduct(productData); // returns res.data directly
  setProducts((prev) => [...prev, newProduct]);
//   const res = await fetch("http://localhost:5000/api/products", {
//     method: "POST",
//     body: formData,
//   });
};

const editProduct = async (id, product) => {
  const updatedProduct = await updateProduct(id, product);
  setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));

// await fetch(`http://localhost:5000/api/products/${id}`, {
//     method: "PUT",
//     body: formData,
//   });

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
      value={{ products, createProduct, editProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
