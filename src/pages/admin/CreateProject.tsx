import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateProject } from '@/api/projects';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "./AdminLayout";
import ProjectForm from './ProjectForm';

// import { toast } from 'sonner';

const CreateProject = () => {
  const createProjectMutation = useCreateProject();


  const { toast } = useToast();

  const handleSubmit = async (formData:any) => {
    try {
      const data = {
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
         milestones: formData.milestones ?? []

          // impact_count: formData.projectForm.impact_count ?? 0
        },
        cover_photo: formData.coverPhoto || null,
        media_files: formData.mediaFiles || [],
      };
      await createProjectMutation.mutateAsync(data);
      
      toast({ title: "Success", description: "Project created successfully!", duration: 4000, type: "success" });
     
    } catch (err: any) {
      
      toast({ title: "Error", description: "Failed to create project.", duration: 4000, type: "error" });
    }
  };
 
 

  const navigate = useNavigate();

  useEffect(() => {
    if (createProjectMutation.isSuccess) {
      setTimeout(() => {
        navigate('/admin/projects');
      }, 3000);
    }
  }, [createProjectMutation.isSuccess]);

  return (
    <AdminLayout>
      <div className="p-6  mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateProject;