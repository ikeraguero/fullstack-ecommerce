import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Main.module.css";
import axios from "axios";

function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <div className={styles.mainContainer}>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product}
              productName={product.name}
              productPrice={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
