import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ✅ Get all products
export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addProduct = async (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("description", product.description);
  if (product.image) {
    formData.append("image", product.image);
  }

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProduct = async (id, product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("description", product.description);

  if (product.image instanceof File) {
    formData.append("image", product.image); 
  } else {
    formData.append("existingImage", product.image); 
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};