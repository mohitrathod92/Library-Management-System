import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Library, Heart, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyBooks = () => {
  const { user } = useAuth();
  const { borrowedBooks } = useLibrary();

  if (user?.role !== 'reader') {
    return <Navigate to="/dashboard" replace />;
  }

  const myBorrows = borrowedBooks.filter(b => b.user_id === user.id);
  const active = myBorrows.filter(b => !b.returned);
  const history = myBorrows.filter(b => b.returned);
  const now = new Date();

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB');

  const stats = [
    { icon: BookOpen, label: 'Currently Borrowed', value: active.length },
    { icon: TrendingUp, label: 'Total Books Read', value: user.total_books_read || 0 },
    { icon: Library, label: 'Libraries Visited', value: user.libraries_visited || 0 },
    { icon: Heart, label: 'Favorite Genre', value: user.favorite_genre || 'N/A' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground font-display">My Books</h1>

      {/* Reader Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default">
            <CardContent className="p-4 text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active" className="transition-all duration-200">Currently Borrowed ({active.length})</TabsTrigger>
          <TabsTrigger value="history" className="transition-all duration-200">History ({history.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          {active.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">You haven't borrowed any books yet.</p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">#</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Book Title</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Author</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Borrowed On</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Due Date</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {active.map((b, idx) => {
                    const isOverdue = new Date(b.due_date) < now;
                    return (
                      <TableRow key={b.id} className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell className="font-medium">{b.book_title}</TableCell>
                        <TableCell>{b.book_author}</TableCell>
                        <TableCell>{formatDate(b.borrow_date)}</TableCell>
                        <TableCell className={isOverdue ? 'text-destructive font-medium' : ''}>{formatDate(b.due_date)}</TableCell>
                        <TableCell>
                          <Badge variant={isOverdue ? 'destructive' : 'default'} className={!isOverdue ? 'bg-primary/10 text-foreground border border-border' : ''}>
                            {isOverdue ? 'Overdue' : 'Active'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          {history.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-muted-foreground">No borrowing history yet.</p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">#</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Book Title</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Author</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Borrowed On</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Returned On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((b, idx) => (
                    <TableRow key={b.id} className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-medium">{b.book_title}</TableCell>
                      <TableCell>{b.book_author}</TableCell>
                      <TableCell>{formatDate(b.borrow_date)}</TableCell>
                      <TableCell>{b.return_date ? formatDate(b.return_date) : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooks;
