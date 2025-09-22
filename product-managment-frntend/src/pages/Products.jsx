import React, { useContext } from "react";
// import { ProductContext } from "../context/ProductProvider";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductProvider";


export default function Products() {
  const { products } = useProducts(); // ✅ get data from hook
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
       <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 -m-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow hover:shadow-lg cursor-pointer bg-white p-4"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {/* Image */}
          <div className="block relative h-48 rounded overflow-hidden">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="object-cover object-center w-full h-full block"
            />
          </div>
          {/* Info */}
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              CATEGORY
            </h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {product.name}
            </h2>
            <p className="text-blue-600 font-bold mt-1">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      )}
    </div>
  );
}
