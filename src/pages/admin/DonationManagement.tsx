import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { useDonations } from '@/api/donation';
import { Link } from 'react-router-dom';
import AdminLayout from "./AdminLayout";
import { useExchangeRate, useUpdateExchangeRate } from '@/api/donation';

const DonationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [usdRate, setUsdRate] =  useState("")

  const {data:rate, isError:IsErrorRate, isPending:LoadingRate, isSuccess:SuccessRate} =  useExchangeRate()
  const {mutate:updateRate, isError:IsErrorUpdateRate, isPending:PendingUpdateRate, isSuccess:SuccessUpdateRate} = useUpdateExchangeRate()
  const handleUpdate = (e:any)=>{
    e.preventDefault()
    const data ={"USD":usdRate}
    updateRate(data)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isPending, isError } = useDonations({
    search: debouncedSearch,
    frequency: frequencyFilter !== 'all' ? frequencyFilter : '',
    status: statusFilter !== 'all' ? statusFilter : '',
    payment_method: paymentMethodFilter !== 'all' ? paymentMethodFilter : '',
    page,
    page_size: pageSize
  });
  const donations = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.total_pages || 1;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Donor Name', 'Email', 'Amount', 'Frequency', 'Payment Method', 'Status', 'Date'],
      ...donations.map(d => [
        d.donorName, d.email, d.amount, d.frequency, d.paymentMethod, d.status, d.date
      ])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donations.csv';
    a.click();
  };

  if (isPending) return <div className="p-6">Loading donations...</div>;
  if (isError) return <div className="p-6 text-red-600">Failed to load donations.</div>;

  return (
    <AdminLayout>
         <div className="p-6 space-y-6">
      <div className="mb-4">
        <Link to="/admin">
          <Button variant="outline">Back to Admin Home</Button>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif">Donation Management</h1>
          <p className="text-muted-foreground">Monitor and manage all donation activities</p>
        </div>
        <Button onClick={exportData} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

             <Card>
        <CardHeader>
          <CardTitle>Exchange Rate</CardTitle>
        </CardHeader>
        <CardContent>
          {LoadingRate ? (
            <div>Loading exchange rate...</div>
          ) : rate?.data ? (
            <div className="mb-4">
              <div className="flex gap-6">
                <div>
                  <span className="font-semibold">USD:</span> {Number(rate.data.USD).toLocaleString()} 
                </div>
                <div>
                  <span className="font-semibold">NGN:</span> {Number(rate.data.NGN).toLocaleString()} 
                </div>
              </div>
            </div>
          ) : (
            <div>No exchange rate data available.</div>
          )}
          <form className="flex gap-2 items-end" onSubmit={handleUpdate}>
            <div>
              <Label htmlFor="usdRate">Update USD Rate</Label>
              <Input
                id="usdRate"
                type="number"
                step="0.01"
                value={usdRate}
                onChange={e => setUsdRate(e.target.value)}
                placeholder="Enter new USD rate"
                min="0"
              />
            </div>
            <Button type="submit" disabled={PendingUpdateRate || !usdRate}>
              {PendingUpdateRate ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Input
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                  className="pl-2 pr-8"
                />
                {isPending && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </span>
                )}
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Frequency</Label>
              <Select value={frequencyFilter} onValueChange={(val) => { setFrequencyFilter(val); setPage(1); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frequencies</SelectItem>
                  <SelectItem value="ONCE">One-time</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethodFilter} onValueChange={(val) => { setPaymentMethodFilter(val); setPage(1); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="PAYSTACK">Paystack</SelectItem>
                  <SelectItem value="PAYPAL">Paypal</SelectItem>
                
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.donor_full_name}</TableCell>
                  <TableCell>{donation.donor_email}</TableCell>
                  <TableCell>{donation?.currency} {donation.amount.toLocaleString()}</TableCell>
                  <TableCell>{donation.frequency}</TableCell>
                  <TableCell>{donation.payment_client}</TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell>{format(new Date(donation.created_at), 'MMM dd, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </CardContent>
      </Card>
    
    </div>

    </AdminLayout>
 
  );
};

export default DonationManagement;