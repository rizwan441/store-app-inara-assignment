import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { useProducts } from "../context/ProductProvider";
import TiptapEditor from "../components/TiptapEditor";
import Loader from "../components/Loader";


export default function AdminProducts() {
  const { products,loading, createProduct, editProduct, removeProduct } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const ProductSchema = Yup.object().shape({
name: Yup.string()
  .trim("Name cannot be empty or just spaces")
  .strict(true) 
  .required("Name is required"),
    price: Yup.number().required("Price is required").positive("Must be > 0"),
    stock: Yup.number().required("Stock is required").min(0, "Must be >= 0").integer("Must be an integer"),
    image: Yup.string().required("Image URL is required"),
    description: Yup.string() .trim("Name cannot be empty or just spaces")
  .strict(true).required("Description is required"),
  });

const handleSubmit = async (values, { resetForm }) => {
  try {
    if (selectedProduct) {
      await editProduct(selectedProduct.id, values);
      toast.success("Product updated successfully!");
    } else {
     
      await createProduct(values); 
      toast.success("Product added successfully!");
    }

    resetForm();
    setSelectedProduct(null);
    setIsOpen(false);
  } catch (error) {
    console.error("Error saving product:", error);
    toast.error("Something went wrong!");
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      await removeProduct(id); // from context
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  }
};

const openAddModal = () => {
  setSelectedProduct(null);
  setIsOpen(true);
};

const openEditModal = (product) => {
  setSelectedProduct(product);
  setIsOpen(true);
};

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
if(loading) return <Loader />;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin – Manage Products</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Image</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Stock</th>
               <th className="border px-4 py-2 text-left">Description</th>

              <th className="border px-4 py-2 text-left">Actions</th>

            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <img
  src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2">{product.description}</td>


                <td className="border px-4 py-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">
              Add New Product
            </Dialog.Title>

           <Formik
           enableReinitialize
  initialValues={{
    name: selectedProduct?.name || "",
    price: selectedProduct?.price || "",
    stock: selectedProduct?.stock || "",
    image: selectedProduct?.image || "",
    description: selectedProduct?.description || "",
  }}
  validationSchema={ProductSchema}
  onSubmit={handleSubmit}
>
              {({ isSubmitting ,setFieldValue}) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block font-medium">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Price</label>
                    <Field
                      name="price"
                      type="number"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Stock</label>
                    <Field
                      name="stock"
                      type="number"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                 <div>
  <label className="block font-medium">Image</label>
  <input
    name="image"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.currentTarget.files[0];
      setFieldValue("image", file); 
    }}
    className="w-full border px-3 py-2 rounded"
  />
  <ErrorMessage
    name="image"
    component="div"
    className="text-red-500 text-sm"
  />
</div>

                  <div>
                    <label className="block font-medium">Description</label>
                  <Field name="description">
  {({ field, form }) => (
    <TiptapEditor
      value={field.value}
      onChange={(val) => form.setFieldValue("description", val)}
    />
  )}
</Field>

                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
