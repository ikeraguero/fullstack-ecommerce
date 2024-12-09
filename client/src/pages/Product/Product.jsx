import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/products.api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../config";
import axios from "axios";

async function postData(data) {
  const res = await axios.post(`${BASE_URL}/cartItem`, data);
  if (res.status !== 200) {
    throw new Error("Error fetching the data");
  }
  return res.data;
}

function Product({ cart, userId, refetch }) {
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  const options = Array.from(
    { length: product?.stock_quantity },
    (_, i) => i + 1
  );

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  function handleAddToCart() {
    const cartItem = {
      cart_id: cart.id,
      product_id: product.id,
      product_name: product.name,
      quantity: Number(quantity),
      price: product.price,
      image_data: product.image_data,
      image_type: product.image_type,
    };
    mutation.mutate(cartItem);
    console.log("a");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productPhoto}>
        <img
          src={`data:${product?.image_type};base64,${product?.image_data}`}
          alt={product?.name}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productDetailsTop}>
          <h3 className={styles.productCategory}>{product.category}</h3>
          <h1>{product?.name}</h1>
          <h2>R${product?.price}</h2>
        </div>
        <span>Stock Available: {product?.stock_quantity}</span>
        <span>{product.product_description}</span>
        <div className={styles.productQuantity}>
          <label htmlFor="quantity">Quantity:</label>
          <select
            name="quantity"
            id=""
            className={styles.select}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.interactive}>
          <div className={styles.interactiveQuantity}></div>
          <div className={styles.interactiveButtons}>
            <button
              className={styles.buttonAddToCart}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button className={styles.buttonBuy}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
