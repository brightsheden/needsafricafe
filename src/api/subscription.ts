// src/api/subscription.ts
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from './utils';

// List Subscriptions (if you still need it)
export const useSubscriptions = ({ search = '', page = 1, page_size = 10 } = {}) =>
  useQuery({
    queryKey: ['subscriptions', { search, page, page_size }],
    queryFn: () =>
      api
        .get('/api/subscription/', {
          params: { search, page, page_size },
        })
        .then(res => res.data),
  });

// Get single subscription (if needed)
export const useSubscription = (subscriptionId: number) =>
  useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => api.get(`/api/subscription/${subscriptionId}`).then(res => res.data),
    enabled: !!subscriptionId,
  });

// Create Subscription (only email)
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { email: string }) =>
      api.post('/api/subscription/', payload).then(res => res.data),
    onSuccess: () => {
      // refresh the subscriptions list if present in cache
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};
