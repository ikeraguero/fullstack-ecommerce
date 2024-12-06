import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormProvider } from "./hooks/useFormContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import axios from "axios";
import useSWR from "swr";
import { BASE_URL } from "./config";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  const { data: categories } = useSWR(`${BASE_URL}/categories`, fetcher);

  return (
    <FormProvider>
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
    </FormProvider>
  );
}

export default App;
