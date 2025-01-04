import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../actions/productFormActions";

async function updateProduct(data) {
  try {
    const res = await apiClient.put(`/products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
}

async function createProduct(data) {
  try {
    console.log(data);
    const res = await apiClient.post(`/products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating product");
  }
}

async function fetchProducts() {
  try {
    const res = await apiClient.get(`/products`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
}

async function fetchProductById(productId, userId) {
  try {
    console.log(userId);
    const res = await apiClient.get(`/products/${productId}`, {
      headers: {
        "User-ID": userId,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error fetching product with ID ${productId}`
    );
  }
}

async function fetchProductByCategory(categoryName) {
  try {
    const res = await apiClient.get(`/products/categories/${categoryName}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error fetching products in category ${categoryName}`
    );
  }
}

async function removeProduct(productId) {
  try {
    const res = await apiClient.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error removing product with ID ${productId}`
    );
  }
}

export function useUpdateProduct() {
  return useApiMutation(
    (data) => updateProduct(data),
    "products",
    null,
    (error) => console.error("Error updating product:", error.message)
  );
}

export function useCreateProduct() {
  return useApiMutation(
    (data) => createProduct(data),
    "products",
    null,
    (error) => console.error("Error creating product:", error.message)
  );
}

export function useRemoveProduct() {
  const productsState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const { products } = productsState;
  return useApiMutation(
    (productId) => removeProduct(productId),
    "products",
    (productId) => {
      dispatch(
        loadProducts(products.filter((product) => product.id !== productId))
      );
    },
    (error) => console.error("Error removing product:", error.message)
  );
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onError: (error) => {
      console.error("Error fetching products:", error.message);
    },
  });
}

export function useProductsByCategory(categoryName) {
  return useQuery({
    queryKey: ["productsByCategory", categoryName],
    queryFn: () => fetchProductByCategory(categoryName),
    onError: (error) => {
      console.error("Error fetching products by category:", error.message);
    },
  });
}

export function useProduct(productId) {
  const userId = useSelector((state) => state.auth.id);
  return useQuery({
    queryKey: ["product", productId, userId],
    queryFn: () => fetchProductById(productId, userId ? userId : 0),
    onError: (error) => {
      console.error("Error fetching product:", error.message);
    },
  });
}
