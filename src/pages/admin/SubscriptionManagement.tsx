import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Trash2, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { useSubscriptions } from '@/api/subscription';
import { useQueryClient } from '@tanstack/react-query';
import api from '@/api/utils'; // adjust import if your api util path differs
import { useToast } from '@/hooks/use-toast';

const PAGE_SIZE = 10;

const SubscriptionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const { data, isError, isPending } = useSubscriptions({
    search: debouncedSearch,
    page,
    page_size: PAGE_SIZE,
  });

  const subs: Array<any> = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.total_pages || 1;
  const total = data?.total || 0;

  const exportCsv = () => {
    const rows = [
      ['ID', 'Email', 'Active', 'Created At'],
      ...subs.map((s) => [
        s.id,
        s.email,
        s.active ? 'Active' : 'Inactive',
        s.created_at ? format(new Date(s.created_at), 'yyyy-MM-dd HH:mm:ss') : '',
      ]),
    ];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscriptions_page_${page}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCopy = (email: string) => {
    navigator.clipboard?.writeText(email)
      .then(() => toast({ title: 'Copied', description: 'Email copied to clipboard', type: 'success' }))
      .catch(() => toast({ title: 'Error', description: 'Could not copy', type: 'error' }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this subscription? This action cannot be undone.')) return;
    try {
      await api.delete(`/api/subscription/${id}`);
      toast({ title: 'Deleted', description: 'Subscription removed', type: 'success' });
      // refetch subscriptions
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    } catch (err: any) {
      console.error('Delete subscription error', err);
      const msg = err?.response?.data?.message || err?.message || 'Failed to delete';
      toast({ title: 'Error', description: msg, type: 'error' });
    }
  };

  if (isPending) return <div className="p-6">Loading subscriptions...</div>;
  if (isError) return <div className="p-6 text-red-600">Failed to load subscriptions.</div>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold font-serif">Subscriptions</h1>
          <p className="text-muted-foreground">Manage newsletter subscriptions</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-end">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="pl-2"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={exportCsv} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscription List ({total})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">No subscriptions found.</TableCell>
                  </TableRow>
                )}
                {subs.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.id}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      {s.active ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>{s.created_at ? format(new Date(s.created_at), 'MMM dd, yyyy HH:mm') : '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(s.email)} title="Copy email">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)} title="Delete subscription">
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

export default SubscriptionManagement;
