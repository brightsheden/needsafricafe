import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProject } from '@/api/projects';
import { API_URL } from '../../../config';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "./AdminLayout";

// import { toast } from 'sonner';

const CreateProject = () => {
  const createProjectMutation = useCreateProject();
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    goal: '',
    startDate: '',
    endDate: '',
    status: 'Draft',
  });
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState("NGN");
  const [milestoneInput, setMilestoneInput] = useState("");
  const [milestones, setMilestones] = useState<string[]>([]);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [mediaFilesPreview, setMediaFilesPreview] = useState<string[]>([]);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const data = {
        payload: {
          title: projectForm.title,
          summary: projectForm.description,
          category: projectForm.category.toLowerCase(),
          location: projectForm.location || null,
          target_amount: parseFloat(projectForm.goal) || 0,
          currency:currency,
        //   milestones,
          start_date: projectForm.startDate || null,
          deadline: projectForm.endDate || null,
          status: projectForm.status.toLowerCase(),
        },
        cover_photo: coverPhoto,
        media_files: mediaFiles,
      };
      await createProjectMutation.mutateAsync(data);
      setSuccess(true);
      toast({ title: "Success", description: "Project created successfully!", duration: 4000, type: "success" });
      setProjectForm({
        title: '',
        description: '',
        category: '',
        location: '',
        goal: '',
        startDate: '',
        endDate: '',
        status: 'Draft',
      });
      setCoverPhoto(null);
      setMediaFiles([]);
      setCoverPhotoPreview(null);
      setMediaFilesPreview([]);
      setMilestones([]);
    } catch (err: any) {
      setError('Failed to create project.');
      toast({ title: "Error", description: "Failed to create project.", duration: 4000, type: "error" });
    }
  };
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setCoverPhoto(file || null);
    setCoverPhotoPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleMediaFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setMediaFiles(files);
    setMediaFilesPreview(files.map(file => URL.createObjectURL(file)));
  };
  const handleAddMilestone = () => {
    if (milestoneInput.trim()) {
      setMilestones([...milestones, milestoneInput.trim()]);
      setMilestoneInput("");
    }
  };
  const handleRemoveMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project Title</Label>
                  <Input
                    value={projectForm.title}
                    onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={projectForm.category} onValueChange={value => setProjectForm({ ...projectForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Describe the project..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={projectForm.location}
                    onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <Label>Goal Amount (₦)</Label>
                  <Input
                    type="number"
                    value={projectForm.goal}
                    onChange={e => setProjectForm({ ...projectForm, goal: e.target.value })}
                    placeholder="Enter goal amount"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={projectForm.startDate}
                    onChange={e => setProjectForm({ ...projectForm, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={projectForm.endDate}
                    onChange={e => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={projectForm.status} onValueChange={value => setProjectForm({ ...projectForm, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Milestones</Label>
                  <div className="flex gap-2">
                    <Input value={milestoneInput} onChange={e => setMilestoneInput(e.target.value)} placeholder="Add milestone" />
                    <Button type="button" onClick={handleAddMilestone}>Add</Button>
                  </div>
                  <ul className="mt-2 list-disc pl-5">
                    {milestones.map((m, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span>{m}</span>
                        <Button type="button" size="sm" variant="ghost" onClick={() => handleRemoveMilestone(idx)}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Label>Cover Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                />
                {coverPhotoPreview && (
                  <img src={coverPhotoPreview} alt="Cover Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                )}
              </div>
              <div>
                <Label>Media Files</Label>
                <Input
                  type="file"
                  multiple
                  onChange={handleMediaFilesChange}
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {mediaFilesPreview.map((src, idx) => (
                    <img key={idx} src={src} alt={`Media Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={createProjectMutation.isPending}>
                  {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateProject;