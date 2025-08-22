import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {capitalize} from '@/lib/utils'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Archive, 
  Trash2,
  Target,
  Calendar,
  MapPin,
  DollarSign,
  Pencil
} from 'lucide-react';
import { useCreateProject, useDeleteProject, useProjects, useProjectStats, useUpdateProject } from '@/api/projects';
import { API_URL } from "../../../config";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AdminLayout from "./AdminLayout";


const ProjectManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const deleteProjectMutation = useDeleteProject();
  const { toast } = useToast();
  const {data:projects, isPending,isError,error} = useProjects({
    search: searchTerm,
    category: categoryFilter !== 'all' ? categoryFilter : '',
    status: statusFilter !== 'all' ? statusFilter : '',
    page,
    page_size: pageSize
  });
  const createProjectMutation = useCreateProject();


  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    goal: '',
    startDate: '',
    endDate: '',
    status: 'Draft'
  });

  // Filter projects

  // Stats calculations
  const {data:stats, isPending:PendingStats, isError:IsStatError } = useProjectStats()
  const totalProjects = stats?.total
  const activeProjects = stats?.active
  const completedProjects = stats?.completed
  const draftProjects = stats?.draft
  const totalPages = projects?.total_pages || 1;

 
 
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'environment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        setShowCreateModal(false);
        setEditingProject(null);
        setProjectForm({
          title: '',
          description: '',
          category: '',
          location: '',
          goal: '',
          startDate: '',
          endDate: '',
          status: 'Draft'
        });
        return;
      }

      const data = {
        payload: {
          title: projectForm.title,
          summary: projectForm.description,
          category: projectForm.category.toLowerCase(),
          location: projectForm.location || null,
          target_amount: parseFloat(projectForm.goal) || 0,
          start_date: projectForm.startDate || null,
          end_date: projectForm.endDate || null,
          status: projectForm.status.toLowerCase(),
        }
      }

      await createProjectMutation.mutateAsync(data);

      setShowCreateModal(false);
      setProjectForm({
        title: '',
        description: '',
        category: '',
        location: '',
        goal: '',
        startDate: '',
        endDate: '',
        status: 'Draft'
      });
    } catch (error) {
      console.error('Failed to create project:', error);
      // Optionally show error feedback to user
    }
  };
  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category,
      location: project.location,
      goal: project.goal.toString(),
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status
    });
    setShowCreateModal(true);
  };


   

  return (
    <AdminLayout>

         <div className="p-6 space-y-6">
      <div className="mb-4">
        <Link to="/admin">
          <Button variant="outline">Back to Admin Home</Button>
        </Link>
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between ">
        <div>
          <h1 className="text-1xl md:text-3xl font-bold font-serif">Project Management</h1>
          <p className="text-muted-foreground">Create and manage all NGO projects</p>
        </div>
        <Link to={"/admin/projects/create"}>
         <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
        </Link>
      
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

           <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Pencil className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drafts Projects</p>
                <p className="text-2xl font-bold">{draftProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={(val) => { setCategoryFilter(val); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.data?.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {project.cover_image ? (
                <img 
                  src={`${API_URL}${project.cover_image}`} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                {getStatusBadge(project.status)}
                <Badge className={getCategoryColor(project.category)}>
                  {capitalize(project.category)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.summary}
              </p>
              
              <div className="space-y-3">
                {project.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {project.location}
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project?.currency} {parseFloat(project.amount_raised).toLocaleString()} / {project?.currency} {parseFloat(project.target_amount).toLocaleString()}</span>
                  </div>
                  <Progress value={project.percentage_funded} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.percentage_funded}% funded
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditProject(project)}
                >
                  <Link to={`/admin/projects/${project.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => { setProjectToDelete(project); setDeleteDialogOpen(true); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-muted-foreground">Page {page} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}


        <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete the project "${projectToDelete?.title}"? This action cannot be undone.`}
        isLoading={deleteProjectMutation.isPending}
        onDelete={async () => {
          if (!projectToDelete) return;
          try {
            await deleteProjectMutation.mutateAsync(projectToDelete.id);
            toast({ title: 'Project deleted successfully!' });
          } catch (err) {
            toast({ title: 'Failed to delete project', description: err?.message || 'An error occurred', variant: 'destructive' });
          } finally {
            setDeleteDialogOpen(false);
            setProjectToDelete(null);
          }
        }}
        onCancel={() => { setDeleteDialogOpen(false); setProjectToDelete(null); }}
      />
    </div>
    </AdminLayout>
 
  );
};

export default ProjectManagement;