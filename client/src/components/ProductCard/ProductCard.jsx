import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductCard({ productName, productImageId, productPrice }) {
  const [imageData, setImageData] = useState({});
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    console.log(productImageId);
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/images/${productImageId}`
        );
        setImageData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [productImageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img
          src={`data:${imageData.type};base64,${imageData.imageData}`}
          alt={productName}
        />
      </div>
      <div className={styles.productCardBody}>
        <div className={styles.productCardTop}>
          <div className={styles.productCardSubtitle}>
            <h3>clothing</h3>
          </div>
          <div className={styles.productCardTitle}>
            <h1>{productName}</h1>
            <h2>R${productPrice},00</h2>
          </div>
        </div>
        <div className={styles.productCardBottom}>
          <Button>See details</Button>
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
