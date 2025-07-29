import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Search, 
  Edit, 
  UserX, 
  Mail, 
  Users, 
  UserCheck, 
  Shield,
  Upload
} from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@ngowebsite.org',
      role: 'Project Manager',
      status: 'Active',
      joinDate: '2023-01-15',
      avatar: '/team-photo.jpg',
      permissions: ['donation_management', 'project_creation', 'team_view']
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@ngowebsite.org',
      role: 'Volunteer Coordinator',
      status: 'Active',
      joinDate: '2023-03-22',
      avatar: '/team-photo.jpg',
      permissions: ['team_view', 'volunteer_management']
    },
    {
      id: 3,
      name: 'Aisha Okonkwo',
      email: 'aisha@ngowebsite.org',
      role: 'Community Outreach Lead',
      status: 'Active',
      joinDate: '2023-02-10',
      avatar: '/team-photo.jpg',
      permissions: ['project_view', 'community_management']
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david@ngowebsite.org',
      role: 'Finance Manager',
      status: 'Inactive',
      joinDate: '2022-11-05',
      avatar: '/team-photo.jpg',
      permissions: ['donation_management', 'financial_reports']
    },
    {
      id: 5,
      name: 'Emily Watson',
      email: 'emily@ngowebsite.org',
      role: 'Admin',
      status: 'Active',
      joinDate: '2022-08-18',
      avatar: '/team-photo.jpg',
      permissions: ['full_access']
    }
  ];

  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    role: '',
    permissions: []
  });

  const availablePermissions = [
    { id: 'donation_management', label: 'Donation Management' },
    { id: 'project_creation', label: 'Project Creation' },
    { id: 'project_view', label: 'Project View' },
    { id: 'team_view', label: 'Team View' },
    { id: 'team_management', label: 'Team Management' },
    { id: 'volunteer_management', label: 'Volunteer Management' },
    { id: 'community_management', label: 'Community Management' },
    { id: 'financial_reports', label: 'Financial Reports' },
    { id: 'full_access', label: 'Full Access (Admin)' }
  ];

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter(m => m.status === 'Active').length;
  const inactiveMembers = teamMembers.filter(m => m.status === 'Inactive').length;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('admin')) return <Shield className="h-4 w-4" />;
    if (role.toLowerCase().includes('manager')) return <UserCheck className="h-4 w-4" />;
    return <Users className="h-4 w-4" />;
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inviting member:', memberForm);
    setShowInviteModal(false);
    setMemberForm({ name: '', email: '', role: '', permissions: [] });
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      email: member.email,
      role: member.role,
      permissions: member.permissions
    });
    setShowInviteModal(true);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setMemberForm({
        ...memberForm,
        permissions: [...memberForm.permissions, permissionId]
      });
    } else {
      setMemberForm({
        ...memberForm,
        permissions: memberForm.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif">Team Management</h1>
          <p className="text-muted-foreground">Manage team members and permissions</p>
        </div>
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Edit Team Member' : 'Invite New Team Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInviteMember} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Role</Label>
                <Select value={memberForm.role} onValueChange={(value) => setMemberForm({...memberForm, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Volunteer Coordinator">Volunteer Coordinator</SelectItem>
                    <SelectItem value="Community Outreach Lead">Community Outreach Lead</SelectItem>
                    <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/team-photo.jpg" />
                    <AvatarFallback>{memberForm.name ? getInitials(memberForm.name) : 'NA'}</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={memberForm.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                      />
                      <Label htmlFor={permission.id} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => {
                  setShowInviteModal(false);
                  setEditingMember(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMember ? 'Update Member' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <UserX className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inactive Members</p>
                <p className="text-2xl font-bold">{inactiveMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Members Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.permissions.length} permissions
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                      {member.role}
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;