import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { UserPlus, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

const AddAdmin = () => {
  const { user } = useAuth();
  const { users, addUser } = useLibrary();
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (user?.role !== 'librarian') {
    return <Navigate to="/catalog" replace />;
  }

  const handleAdd = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    addUser({ name: form.name, email: form.email, role: 'librarian' });
    toast.success('New admin added successfully!');
    setForm({ name: '', email: '', password: '' });
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Registered Users</h1>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <UserPlus className="h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold">ID</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Name</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Email</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Role</TableHead>
              <TableHead className="text-primary-foreground font-semibold">No. of Books Borrowed</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Registered On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, idx) => (
              <TableRow key={u.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell className="capitalize">{u.role === 'reader' ? 'User' : 'Admin'}</TableCell>
                <TableCell>{u.books_borrowed}</TableCell>
                <TableCell>{u.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add New Admin Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <DialogTitle>Add New Admin</DialogTitle>
            </div>
            <DialogDescription>Create a new librarian account with admin privileges.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-2">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Full name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdmin;
