import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';

import queryClient from 'query-client';
import { User } from './user.types';

export function useList<T>(params: T) {
  const list = () => apiService.get('/users', params);

  interface UserListResponse {
    count: number;
    items: User[];
    totalPages: number;
  }

  return useQuery<UserListResponse>(['users', params], list);
}

export function useCartAdd<T>() {
  const addToCart = (data: T) => apiService.post('/users/cart', data);

  return useMutation<User, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useCartRemove() {
  const removeFromCart = (productId: string) => apiService.delete('/users/cart', { productId });

  return useMutation<User, unknown, string>(removeFromCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}
