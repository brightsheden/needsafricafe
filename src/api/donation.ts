import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './utils';

//donations
export const useDonations = ({
  search = '',
  frequency = '',
  status = '',
  payment_method = '',
  page = 1,
  page_size = 10
} = {}) => {
  return useQuery({
    queryKey: ['donations', { search, frequency, status, payment_method, page, page_size }],
    queryFn: () => api.get('api/donation/donations', {
      params: {
        search: search || undefined,
        frequency: frequency || undefined,
        status: status || undefined,
        payment_method: payment_method || undefined,
        page,
        page_size
      }
    }).then(res => res.data),
  });
};

//donation by id
export const useDonation = (id: number) => {
  return useQuery({
    queryKey: ['donation', id],
    queryFn: () => api.get(`/api/donations/${id}`),
  });
};

//donate
export const useDonate = () => {
  return useMutation({
    mutationFn: async (data: {
      project_id: number;
      donor_email: string;
      donor_full_name: string;
      amount: String;
      currency: string;
      payment_client:string
      frequency:string
    }) => {
      const response = await api.post('/api/donation/donations', data);
      return response.data;
    },
  });
};