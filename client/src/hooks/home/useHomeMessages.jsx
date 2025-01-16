import { useCallback } from "react";

function useHomeMessages() {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const generateMarketingMessages = useCallback((products) => {
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
  }, []);

  return { generateMarketingMessages };
}

export default useHomeMessages;
