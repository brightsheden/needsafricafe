import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './utils';



// List Projects
export const useProjects = ({ search = '', category = '', status = '', page = 1, page_size = 10 } = {}) =>
  useQuery({
    queryKey: ['projects', { search, category, status, page, page_size }],
    queryFn: () =>
      api
        .get('api/project/', {
          params: { search, category, status, page, page_size },
        })
        .then(res => res.data),
  });

// Get Project by ID
export const useProject = (projectId: number) =>
  useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.get(`api/project/${projectId}`).then(res => res.data),
    enabled: !!projectId,
  });

// Create Project
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      media_files?: string[];
      cover_photo?: File | null;
      payload: object;
    }) => {
      const formData = new FormData();

      data?.media_files?.forEach((item, index) => {
        formData.append(`media_files[${index}]`, item);
      });

      if (data.cover_photo) {
        formData.append('cover_photo', data.cover_photo);
      }

      formData.append('payload', JSON.stringify(data.payload));
      console.log(formData)

      for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

console.log('media_files:', data.media_files);
console.log('cover_photo:', data.cover_photo);
console.log('payload:', data.payload);

      return api
        .post('/api/project/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// Update Project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, media_files, cover_photo, payload }: {
      projectId: number;
      payload: object;
      media_files?: string[];
      cover_photo?: File | null;
      
    }) => {
      const formData = new FormData();

      media_files?.forEach((item, index) => {
        formData.append(`media_files[${index}]`, item);
      });

      if (cover_photo) {
        formData.append('cover_photo', cover_photo);
      }

      formData.append('payload', JSON.stringify(payload));

      return api.put(`/api/project/${projectId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => res.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
};

// Delete Project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => api.delete(`/api/project/${projectId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// Add Project Photos
export const useAddProjectPhotos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      photos,
      payload,
    }: {
      projectId: number;
      photos: File[];
      payload: Record<string, any>;
    }) => {
      const formData = new FormData();

      // Append each image file
      photos.forEach((photo) => {
        formData.append("image", photo); // must match backend's expected key
      });

      // Append payload as JSON string
      formData.append("payload", JSON.stringify(payload));

      return api
        .post(`/api/project/${projectId}/photos`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
    },
  });
};

// Delete Project Photo
export const useDeleteProjectPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: number) => api.delete(`/api/project/photos/${photoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};