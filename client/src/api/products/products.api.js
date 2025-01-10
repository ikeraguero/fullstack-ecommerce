import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import useAuth from "@hooks/auth/useAuth";
import { useProductForm } from "@context/useProductFormContext";

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

async function fetchHomeProducts() {
  try {
    const res = await apiClient.get(`/products/featured`);
    console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
}

async function fetchProducts(page, size) {
  try {
    const res = await apiClient.get(`/products?page=${page}&size=${size}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
}

async function fetchProductById(productId, userId) {
  try {
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
  const { toggleDeleteProduct } = useProductForm();
  return useApiMutation(
    (productId) => removeProduct(productId),
    "products",
    () => {
      toggleDeleteProduct(null);
    },
    (error) => console.error("Error removing product:", error.message)
  );
}

export function useHomeProducts() {
  return useQuery({
    queryKey: ["homeProducts"],
    queryFn: () => fetchHomeProducts(),
    onError: (error) => {
      console.error("Error fetching products:", error.message);
    },
  });
}

export function useProducts(page, size) {
  return useQuery({
    queryKey: ["products", page, size],
    queryFn: () => fetchProducts(page, size),
    onSuccess: () => {
      console.log("products fetched");
    },
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
  const { userId } = useAuth();
  return useQuery({
    queryKey: ["product", productId, userId],
    queryFn: () => fetchProductById(productId, userId ? userId : 0),
    onError: (error) => {
      console.error("Error fetching product:", error.message);
    },
  });
}
