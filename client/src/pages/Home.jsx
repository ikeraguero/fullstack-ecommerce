import Nav from "../components/Nav/Nav";
import Main from "../components/Main/Main";
import styles from "../App.module.css";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
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
      <Nav />
      <Main className={styles.container}>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product}
              productName={product.name}
              productImageId={product.image_id}
              productPrice={product.price}
            />
          ))}
        </div>
      </Main>
    </>
  );
}

export default Home;
