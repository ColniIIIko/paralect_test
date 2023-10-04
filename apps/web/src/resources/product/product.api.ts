import { useMutation, useQuery } from 'react-query';
import { apiService } from 'services';
import { Product } from './product.types';

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductListResponse>(['products', params], list);
}

export function useCreation() {
  interface ProductCreationProps {
    fileFormData: FormData;
    title: string;
    price: number;
  }

  const creation = async (data: ProductCreationProps) => {
    const { fileFormData, title, price } = data;
    const { imgUrl } = await apiService.post('/products/upload-image', fileFormData);
    return apiService.post('/products', { imgUrl, title, price });
  };

  return useMutation<Product, unknown, ProductCreationProps>(creation);
}

export function useImageUpload<T>() {
  const upload = (data: T) => apiService.post('/products/upload-image', data);

  interface ImageUploadResponse {
    imgURL: string;
  }

  return useMutation<ImageUploadResponse, unknown, T>(upload);
}

export function useUserProducts() {
  const products = () => apiService.get('/users/products');

  interface ProductListResponse {
    count: number;
    products: Product[];
  }

  return useQuery<ProductListResponse>('users/products', products);
}

export function useDelete() {
  const deleteProduct = (productId: string) => apiService.delete(`products/${productId}`);

  return useMutation(deleteProduct);
}
