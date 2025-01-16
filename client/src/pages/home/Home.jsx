import { useState, useEffect } from "react";

import Main from "@features/shared/components/Main/Main";
import Carousel from "@features/carousel/components/Carousel/Carousel";
import styles from "./Home.module.css";
import { useHomeProducts } from "@api/products/products.api";
import HomeProducts from "@features/products/components/HomeProducts/HomeProducts";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import useHomeMessages from "@hooks/home/useHomeMessages";

function Home({ onCategoryChange }) {
  const { data: products, error, isLoading, refetch } = useHomeProducts();
  const { generateMarketingMessages } = useHomeMessages();
  const [marketingInfo, setMarketingInfo] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (products && isFirstLoad) {
      const result = generateMarketingMessages(products);
      setMarketingInfo(result);
      setIsFirstLoad(false);
    }
    onCategoryChange(null);
  }, [products]);

  if (!marketingInfo) {
    return null;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} retry={refetch} />;
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
