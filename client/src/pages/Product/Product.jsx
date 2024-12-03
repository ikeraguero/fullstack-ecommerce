import axios from "axios";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const options = Array.from(
    { length: product?.stock_quantity },
    (_, i) => i + 1
  );

  useEffect(
    function () {
      async function fetchProduct() {
        await axios
          .get(`http://localhost:8080/api/products/${id}`)
          .then((res) => setProduct(res.data))
          .catch((err) => console.log(err));
      }
      fetchProduct();
    },
    [id]
  );

  useEffect(
    function () {
      async function fetchImage() {
        await axios
          .get(`http://localhost:8080/api/images/${product.image_id}`)
          .then((res) => setImage(res.data))
          .catch((err) => console.log(err));
      }
      fetchImage();
    },
    [product]
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/categories/${product?.category_id}`)
      .then((res) => setCategory(res.data.name))
      .catch((err) => console.log(err));

    setIsLoading(false);
  }, [product?.category_id]);

  if (isLoading || !product || !image || !category) {
    return <di>Loading...</di>;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.productPhoto}>
        <img
          src={`data:${image?.type};base64,${image?.imageData}`}
          alt={product?.name}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productDetailsTop}>
          <h3 className={styles.productCategory}>{category}</h3>
          <h1>{product?.name}</h1>
          <h2>R${product?.price}</h2>
        </div>
        <span>In stock: {product?.stock_quantity}</span>
        <span>Short Description</span>
        <select name="" id="" className={styles.select}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className={styles.interactive}>
          <div className={styles.interactiveQuantity}></div>
          <div className={styles.interactiveButtons}>
            <button className={styles.buttonAddToCart}>Add to Cart</button>
            <button className={styles.buttonBuy}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
