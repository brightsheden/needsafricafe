import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useVolunteers, useDeleteVolunteer } from '@/api/volunteer';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import api from '@/api/utils';
import { API_URL } from '../../../config';

const PAGE_SIZE = 10;

const VolunteerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const qc = useQueryClient();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const { data, isPending, isError } = useVolunteers({
    search: debouncedSearch,
    role: roleFilter !== 'all' ? roleFilter : '',
    availability: availabilityFilter !== 'all' ? availabilityFilter : '',
    page,
    page_size: PAGE_SIZE,
  });

  const volunteers = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.total_pages || 1;
  const total = data?.total || 0;

  const deleteMutation = useDeleteVolunteer();

  const exportCsv = async (all = false) => {
    // If user wants full export, either fetch all pages server-side endpoint or iterate client-side.
    // Here we export current page only (client-side). If you want full dataset, implement server export endpoint.
    const rows = [
      ['ID', 'First Name', 'Last Name', 'Age', 'Country', 'Role', 'Availability', 'Hours', 'Days', 'CV URL', 'Created At'],
      ...volunteers.map((v: any) => [
        v.id,
        v.first_name,
        v.last_name,
        v.age ?? '',
        v.country ?? '',
        v.role ?? '',
        v.availability ?? '',
        v.hours ?? '',
        v.days ?? '',
        v.cv ?? '',
        v.created_at ? format(new Date(v.created_at), 'yyyy-MM-dd HH:mm:ss') : '',
      ]),
    ];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volunteers_page_${page}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this volunteer? This cannot be undone.')) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: 'Deleted', description: 'Volunteer deleted', type: 'success' });
      qc.invalidateQueries({ queryKey: ['volunteers'] });
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || 'Delete failed';
      toast({ title: 'Error', description: msg, type: 'error' });
    }
  };

  const handleDownloadCV = (cvUrl?: string) => {
    if (!cvUrl) {
      toast({ title: 'No CV', description: 'No CV uploaded for this volunteer', type: 'info' });
      return;
    }
    // Open CV in new tab (assumes cvUrl is absolute or relative to your domain)
    window.open(`${API_URL}${cvUrl}`, '_blank');
  };

  if (isPending) return <div className="p-6">Loading volunteers...</div>;
  if (isError) return <div className="p-6 text-red-600">Failed to load volunteers.</div>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold font-serif">Volunteer Applications</h1>
          <p className="text-muted-foreground">Manage volunteer applications and CVs</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-end">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search by name or country..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="pl-2"
              />
            </div>

            <div>
              <Label>Role</Label>
              <select
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                className="rounded border bg-background px-2 py-1"
              >
                <option value="all">All Roles</option>
                <option value="computer-tech">Computer Tech</option>
                <option value="lab-tech">Laboratory Tech</option>
                <option value="medical-tech">Medical Equipment Tech</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <Label>Availability</Label>
              <select
                value={availabilityFilter}
                onChange={(e) => { setAvailabilityFilter(e.target.value); setPage(1); }}
                className="rounded border bg-background px-2 py-1"
              >
                <option value="all">All</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>
          </div>

          <div>
            <Button onClick={() => exportCsv()} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV (page)
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Volunteer List ({total})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>CV</TableHead>
                  <TableHead>Applied At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">No volunteers found.</TableCell>
                  </TableRow>
                )}
                {volunteers.map((v: any) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.id}</TableCell>
                    <TableCell>{`${v.first_name} ${v.last_name}`}</TableCell>
                    <TableCell>{v.age ?? '-'}</TableCell>
                    <TableCell>{v.country ?? '-'}</TableCell>
                    <TableCell>{v.role ?? '-'}</TableCell>
                    <TableCell>
                      {v.availability ? (
                        <Badge className="bg-blue-100 text-blue-800">{v.availability}</Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {v.hours ?? '-'}
                    </TableCell>
                     <TableCell>
                      {v.days ?? '-'}
                    </TableCell>
                    <TableCell>
                      {v.cv ? (
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadCV(v.cv)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{v.created_at ? format(new Date(v.created_at), 'MMM dd, yyyy HH:mm') : '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(v.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default VolunteerManagement;
