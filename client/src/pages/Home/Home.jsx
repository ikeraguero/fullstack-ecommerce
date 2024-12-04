import Main from "../../components/Main/Main";
import styles from "./Home.module.css";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Main className={styles.container}>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productName={product.name}
              productImageId={product.image_id}
              productPrice={product.price}
              productCategoryId={product.category_id}
            />
          ))}
        </div>
      </Main>
    </>
  );
}

export default Home;
