import { useState, useEffect } from "react";

import Main from "@features/shared/components/Main/Main";
import Carousel from "@features/carousel/components/Carousel/Carousel";
import styles from "./Home.module.css";
import { MoonLoader } from "react-spinners";
import { useHomeProducts } from "@api/products/products.api";
import HomeProducts from "@features/products/components/HomeProducts/HomeProducts";

function Home({ onCategoryChange }) {
  const { data: products, error, isLoading } = useHomeProducts();
  const [marketingInfo, setMarketingInfo] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);


  useEffect(() => {
    if (products && isFirstLoad) {
      const result = generateMarketingMessages(products);
      setMarketingInfo(result);
      setIsFirstLoad(false);
    }
    onCategoryChange(null);
  }, [products, isFirstLoad, onCategoryChange]);

  if (isLoading) {
    return (
      <>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateMarketingMessages(products) {
    const messages = [
      "Explore the latest trends in ",
      "Uncover top picks from the world of ",
      "Discover what's new and popular in ",
      "Dive into the best products for your ",
      "See the must-have items in ",
      "Get inspired by the finest in ",
      "Your ultimate selection for ",
      "Elevate your experience with our top choices in ",
      "Curated selections for your perfect ",
      "Experience the best of the best in ",
    ];

    const categories = Object.keys(products);
    shuffle(categories);
    shuffle(messages);

    const marketingInfo = {};

    categories.forEach((category, index) => {
      if (messages[index]) {
        marketingInfo[category] = {
          message: messages[index] + category,
          products: products[category],
        };
      }
    });

    return marketingInfo;
  }

  if (!marketingInfo) {
    return null;
  }

  const categoriesArray = Object.values(marketingInfo);

  return (
    <Main className={styles.container}>
      <Carousel className={styles.carousel} />
      {categoriesArray.map((category) => (
        <HomeProducts
          key={category.message}
          {...category}
          onCategoryChange={onCategoryChange}
        />
      ))}
    </Main>
  );
}

export default Home;
