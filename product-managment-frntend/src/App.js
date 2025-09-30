import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminProducts from "./pages/AdminProducts";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "../src/context/ProductProvider";
import Loader from "./components/Loader";


function App() {
    const { loading } = useProducts(); 

   if (loading) return <Loader />;

  return (

    <Router>
                <Navbar/>
                      <ToastContainer position="top-right" autoClose={3000} />


      <Routes>
        <Route path="/" element={<Products />} /> {/* Guest view */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
