import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface ProjectFormProps {
  initialValues?: any;
  onSubmit: (data: any) => Promise<void>;
  isPending?: boolean;
  submitLabel?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialValues, onSubmit, isPending, submitLabel }) => {
  function capitalize(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  }

  const [projectForm, setProjectForm] = useState({
    title: initialValues?.title || '',
    description: initialValues?.summary || '',
    category: capitalize(initialValues?.category) || '',
    location: initialValues?.location || '',
    target_amount: initialValues?.target_amount ? String(initialValues.target_amount) : '',
    startDate: initialValues?.startDate || '',
    endDate: initialValues?.deadline || '',
    status: capitalize(initialValues?.status) || 'DRAFT',
    currency: initialValues?.currency || '',
    receiving_donation: initialValues?.receiving_donation || false,
    donation_reason: initialValues?.donation_reason || '',
    // Impact fields
    impact_phrase: initialValues?.impact_phrase || '',
    beneficiary_count: initialValues?.beneficiary_count ?? null,
    impact_count: initialValues?.impact_count ?? null

  });

  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [currency, setCurrency] = useState(initialValues?.currency || 'USD');
  const [milestoneInput, setMilestoneInput] = useState('');
  const [milestones, setMilestones] = useState<string[]>([]);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [mediaFilesPreview, setMediaFilesPreview] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      setCoverPhotoPreview(initialValues.coverPhotoUrl || null);
      setMediaFilesPreview(initialValues.mediaFilesUrls || []);
    }
  }, [initialValues]);

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
      setMilestoneInput('');
    }
  };

  const handleRemoveMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      projectForm,
      coverPhoto,
      mediaFiles,
      currency,
      milestones,
    });
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title & Category */}
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
                {projectForm.category ? (
                  <SelectValue placeholder={projectForm.category} />
                ) : (
                  <SelectValue placeholder="Select category" />
                )}
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

        {/* Description */}
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

        {/* Location & Goal */}
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
            <Label>Goal Amount ($)</Label>
            <Input
              type="number"
              value={projectForm.target_amount}
              onChange={e => setProjectForm({ ...projectForm, target_amount: e.target.value })}
              placeholder="Enter goal amount"
              min="0"
              required
            />
          </div>
        </div>

        {/* End Date */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select value={projectForm.status} onValueChange={value => setProjectForm({ ...projectForm, status: value })}>
            <SelectTrigger>
              {projectForm.status ? (
                <SelectValue placeholder={projectForm.status} />
              ) : (
                <SelectValue placeholder="Select status" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency & Milestones */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Currency</Label>
            <Select value={projectForm.currency} onValueChange={value => setProjectForm({ ...projectForm, currency: value })}>
              <SelectTrigger>
                {projectForm.currency ? (
                  <SelectValue placeholder={projectForm.currency} />
                ) : (
                  <SelectValue placeholder="Select currency" />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">NGN</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
               
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

        {/* Impact Record */}
        <div className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">Impact Record</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Impact Phrase</Label>
              <Input
                value={projectForm.impact_phrase}
                onChange={e => setProjectForm({ ...projectForm, impact_phrase: e.target.value })}
                placeholder="e.g., Improved community health"
              />
            </div>
            <div>
              <Label>Beneficiary Count</Label>
              <Input
                type="number"
                value={projectForm.beneficiary_count}
                onChange={e => setProjectForm({ ...projectForm, beneficiary_count: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label>Impact Count</Label>
              <Input
                type="number"
                value={projectForm.impact_count}
                onChange={e => setProjectForm({ ...projectForm, impact_count: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Cover Photo */}
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

        {Array.isArray(initialValues?.photos) &&
          initialValues.photos.length > 0 &&
          projectForm.receiving_donation && (
            <div>
              <Label>Reason for Donation Continuation</Label>
              <Input
                type='text'
                value={projectForm.donation_reason}
                onChange={e =>
                  setProjectForm({
                    ...projectForm,
                    donation_reason: e.target.value,
                  })
                }
                placeholder='Reason for donation continuation'
              />
            </div>
        )}
        {/* Donation Continue & Submit */}
        <div className="flex justify-between">
          <div className='flex gap-2'>
            <Label>Donation Continue</Label>
            <Checkbox
              onCheckedChange={() => setProjectForm({ ...projectForm, receiving_donation: !projectForm.receiving_donation })}
              checked={projectForm.receiving_donation}
              value={projectForm.receiving_donation ? 'true' : 'false'}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : submitLabel || 'Save'}
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default ProjectForm;
