import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav/Nav";
import axios from "axios";
import Home from "./pages/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound";
import ManageProduct from "./pages/ManageProduct/ManageProduct";

const BASE_URL = "http://localhost:8080/api";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(categories);
  return (
    <BrowserRouter>
      <Nav categories={categories} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="products/:id" element={<Product />} />
        <Route
          path="/addproduct"
          element={<ManageProduct categories={categories} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
