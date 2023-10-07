import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { productTypes } from 'resources/product';
import { userTypes } from 'resources/user';

export function useSignIn<T>() {
  const signIn = (data: T) => apiService.post('/account/sign-in', data);

  return useMutation<userTypes.User, unknown, T>(signIn, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useSignOut() {
  const signOut = () => apiService.post('/account/sign-out');

  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.setQueryData(['account'], null);
    },
  });
}

export function useSignUp<T>() {
  const signUp = async (data: T) => {
    await apiService.post('/account/sign-up', data);
    return apiService.post('/account/sign-in', data);
  };

  return useMutation<userTypes.User, unknown, T>(signUp, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useForgotPassword<T>() {
  const forgotPassword = (data: T) => apiService.post('/account/forgot-password', data);

  return useMutation<{}, unknown, T>(forgotPassword);
}

export function useResetPassword<T>() {
  const resetPassword = (data: T) => apiService.put('/account/reset-password', data);

  return useMutation<{}, unknown, T>(resetPassword);
}

export function useResendEmail<T>() {
  const resendEmail = (data: T) => apiService.post('/account/resend-email', data);

  return useMutation<{}, unknown, T>(resendEmail);
}

export function useGet(options?: {}) {
  const get = () => apiService.get('/account');

  return useQuery<userTypes.User>(['account'], get, options);
}

export function useUpdate<T>() {
  const update = (data: T) => apiService.put('/account', data);

  return useMutation<userTypes.User, unknown, T>(update);
}

export function useUploadAvatar<T>() {
  const uploadAvatar = (data: T) => apiService.post('/account/avatar', data);

  return useMutation<userTypes.User, unknown, T>(uploadAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useRemoveAvatar() {
  const removeAvatar = () => apiService.delete('/account/avatar');

  return useMutation<userTypes.User>(removeAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useCartAdd<T>() {
  const addToCart = (data: T) => apiService.post('/account/cart', data);

  return useMutation<userTypes.User, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useCartRemove() {
  const removeFromCart = (productId: string) => apiService.delete('/account/cart', { productId });

  return useMutation<userTypes.User, unknown, string>(removeFromCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useUserProducts() {
  const products = () => apiService.get('/account/products');

  interface ProductListResponse {
    count: number;
    products: productTypes.Product[];
  }

  return useQuery<ProductListResponse>('account/products', products);
}

export function useProceedCheckout() {
  const proceedCheckout = () => apiService.post('account/cart/proceed-checkout');

  return useMutation<{ url: string }>(proceedCheckout, {
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });
}

export function useOrdersHistory() {
  const list = () => apiService.get('account/orders');

  interface OrdersHistoryResponse {
    orders: {
      products: {
        product: productTypes.Product;
        quantity: number;
      }[];
      date: string;
    }[];
  }

  return useQuery<OrdersHistoryResponse>(['account/orders'], list);
}
