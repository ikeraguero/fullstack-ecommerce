import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { checkProductInUserCart, createCart } from "../../api/cart.api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCart from "../../api/cart.api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../config";

async function postData(data) {
  const res = await axios.post(`${BASE_URL}/cartItem`, data);
  if (res.status !== 200) {
    throw new Error("Error fetching the data");
  }
  return res.data;
}

function ProductCard({
  id,
  name,
  price,
  category_name,
  image_data,
  image_type,
  userId,
  refetch,
}) {
  const [isOnCart, setIsOnCart] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useCart(userId);

  useEffect(() => {
    async function checkIsOnCart() {
      const res = await checkProductInUserCart(id, userId);
      setIsOnCart(res);
    }
    checkIsOnCart();
  }, [id, userId]);

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  async function handleAddToCart() {
    if(!cart) {
      const createCartData = {
        status: "active",
        user_id: userId
      }

      cart = await createCart(createCartData);
    }
    const cartItem = {
      cart_id: cart.id,
      product_id: id,
      product_name: name,
      quantity: Number(quantity),
      price: price,
      image_data: image_data,
      image_type: image_type,
    };
    mutation.mutate(cartItem);
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img src={`data:${image_type};base64,${image_data}`} alt={name} />
      </div>
      <div className={styles.productCardBody}>
        <div className={styles.productCardTop}>
          <div className={styles.productCardSubtitle}>
            <h3>{category_name}</h3>
          </div>
          <div className={styles.productCardTitle}>
            <h1>{name}</h1>
            <h2>R${price},00</h2>
          </div>
        </div>
        <div className={styles.productCardBottom}>
          <Link to={`/products/${id}`}>
            <Button>See details</Button>
          </Link>
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <Button>Add to cart</Button>
            </Link>
          ) : isOnCart ? (
            <Button onClick={handleAddToCart}>Add to cart</Button>
          ) : (
            <Button>Remove from cart</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
