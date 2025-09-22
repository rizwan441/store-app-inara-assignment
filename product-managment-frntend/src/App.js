import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminProducts from "./pages/AdminProducts";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";

function App() {
  return (

    <Router>
                <Navbar/>

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
