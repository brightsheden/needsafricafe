import { useMutation, useQuery } from '@tanstack/react-query';
import api from './utils';

// Register user (Mutation)
export const useRegister = () =>
  useMutation({
    mutationFn: (data: Record<string, any>) => api.post('api/auth/register', data).then(res => res.data),
  });

// Login user (Mutation)
export const useLogin = () =>
  useMutation({
    mutationFn: (data: { username: string; password: string }) => api.post('api/auth/login', data).then(res => res.data),
  });

// Get my profile (Query)
export const useMyProfile = (enabled = true) =>
  useQuery({
    queryKey: ['myProfile'],
    queryFn: () => api.get('/user/me').then(res => res.data),
    enabled,
  });