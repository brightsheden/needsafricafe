import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './utils';

export const useSubmitVolunteer = () => {
  return useMutation({
    mutationFn: (data: {
      form: {
        firstName: string;
        lastName: string;
        age: string;
        country: string;
        role: string;
        availability: string;
        hours?: string;
        days?: string;
      };
      cv: File | null;
    }) => {
      const formData = new FormData();

      // Attach CV
      if (data.cv) {
        formData.append('cv', data.cv);
      }

      // Attach form fields as JSON
      formData.append('payload', JSON.stringify(data.form));


      return api
        .post('/api/volunteer/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data);
    },
  });
};

export const useVolunteers = ({
  search = '',
  country = '',
  role = '',
  availability = '',
  status,
  page = 1,
  page_size = 10,
} = {}) =>
  useQuery({
    queryKey: ['volunteers', { search, country, role, availability, status, page, page_size }],
    queryFn: () =>
      api
        .get('/api/volunteer/', {
          params: { search, country, role, availability, status, page, page_size },
        })
        .then(res => res.data),
  });


export const useDeleteVolunteer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/volunteer/${id}`).then(res => res.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
};