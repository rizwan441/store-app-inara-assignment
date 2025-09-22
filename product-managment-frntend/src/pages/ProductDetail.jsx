import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-600">Product not found.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    {/* Back Button */}
    <button
      onClick={() => navigate("/products")}
      className="mb-8 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
    >
      ← Back
    </button>

    {/* Product Detail */}
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Product Image */}
      <div className="relative group">
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-[28rem] object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
          PRODUCT DETAILS
        </h2>
        <h1 className="text-gray-900 text-4xl title-font font-bold mb-4">
          {product.name}
        </h1>
        <p className="text-blue-600 text-2xl font-semibold mb-3">
          ${product.price}
        </p>
        <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
        <p className="leading-relaxed text-gray-700">{product.description}</p>
      </div>
    </div>
  </div>
</section>

  );
}
