import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, User, BookOpen, Library, Heart } from 'lucide-react';
import { UserProfile } from '@/types';

const Users = () => {
  const { user } = useAuth();
  const { users } = useLibrary();
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  if (user?.role !== 'librarian') {
    return <Navigate to="/catalog" replace />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground font-display">Registered Users</h1>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold">ID</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Name</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Email</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Role</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Books Borrowed</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Libraries Visited</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Registered On</TableHead>
              <TableHead className="text-primary-foreground font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, idx) => (
              <TableRow key={u.id} className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs capitalize">{u.role === 'reader' ? 'Reader' : 'Admin'}</Badge>
                </TableCell>
                <TableCell>{u.books_borrowed}</TableCell>
                <TableCell>{u.libraries_visited || 0}</TableCell>
                <TableCell>{u.created_at.split(' ')[0]}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => setSelectedUser(u)}
                    className="p-1.5 rounded hover:bg-muted transition-all duration-200 hover:scale-110"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4 text-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View user profile and reading statistics.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <Badge variant="outline" className="text-xs mt-1 capitalize">{selectedUser.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: 'Books Borrowed', value: selectedUser.books_borrowed },
                  { icon: Library, label: 'Libraries Visited', value: selectedUser.libraries_visited || 0 },
                  { icon: BookOpen, label: 'Total Books Read', value: selectedUser.total_books_read || 0 },
                  { icon: Heart, label: 'Favorite Genre', value: selectedUser.favorite_genre || 'N/A' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 text-center transition-all duration-200 hover:bg-muted">
                    <stat.icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Member since: {selectedUser.member_since || selectedUser.created_at.split(' ')[0]}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
