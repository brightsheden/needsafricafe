import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProject, useUpdateProject } from '@/api/projects';
import ProjectForm from './ProjectForm';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading, isError } = useProject(Number(id));
  const updateProjectMutation = useUpdateProject();

  const handleUpdate = async (formData: any) => {
    try {
      await updateProjectMutation.mutateAsync({
        projectId: Number(id),
        payload: {
          title: formData.projectForm.title || '',
          summary: formData.projectForm.description || '',
          category: formData.projectForm.category?.toLowerCase() || '',
          location: formData.projectForm.location || null,
          target_amount: parseFloat(formData.projectForm.target_amount) || 0,
          currency: formData.projectForm.currency || 'USD',
          deadline: formData.projectForm.endDate || null,
          status: formData.projectForm.status || 'draft',
          receiving_donation:  formData.projectForm.receiving_donation || false ,
          donation_reason: formData.projectForm.donation_reason || "",
           // Impact fields
          impact_phrase: formData.projectForm.impact_phrase || '',
          beneficiary_count: formData.projectForm.beneficiary_count ?? 0,
          impact_count: formData.projectForm.impact_count ?? 0,
          milestones: formData.milestones ?? [],
          goals: formData.goals ?? [],
          donation_supports: formData.achievements ?? []
        },

        cover_photo: formData.coverPhoto || null,
        media_files: formData.mediaFiles || [],
      });

      toast({
        title: 'Success',
        description: 'Project updated successfully!',
        duration: 4000,
        type: 'success',
      });

      setTimeout(() => navigate('/admin/projects'), 2000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        duration: 4000,
        type: 'error',
      });
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !project) return <div className="p-6">Failed to load project.</div>;

  return (
    <div className="p-6 mx-auto">
      <Card>
        <CardHeader className='flex justify-between'>
          <CardTitle>Edit Project</CardTitle>
          
          <Link className='' to={`/projects/proof/${id}`}>
          <Button>Upload Proof Of Delivery</Button>
          </Link>
        </CardHeader>
        <ProjectForm
          initialValues={project?.data}
          onSubmit={handleUpdate}
          isPending={updateProjectMutation.isPending}
          submitLabel="Update Project"
        />
      </Card>
    </div>
  );
};

export default ProjectEdit;
