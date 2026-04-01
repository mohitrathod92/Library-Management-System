import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Clock, CheckCircle2, AlertTriangle,
  RefreshCw, CalendarDays, IndianRupee, BookMarked, History,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyBooks = () => {
  const { user } = useAuth();
  const { borrowedBooks, loading, refreshBorrowedBooks } = useLibrary();

  if (user?.role !== 'reader') {
    return <Navigate to="/dashboard" replace />;
  }

  // All borrows are already scoped to this user from the backend
  const active = borrowedBooks.filter(b => !b.returned);
  const history = borrowedBooks.filter(b => b.returned);
  const now = new Date();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const getDaysLeft = (dueDateStr: string) => {
    const diff = Math.ceil((new Date(dueDateStr).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const totalFinesPaid = history.reduce((acc, b) => acc + (b.fine || 0), 0);
  const totalPaid = history.reduce((acc, b) => acc + (b.price || 0) + (b.fine || 0), 0);
  const overdueCount = active.filter(b => new Date(b.due_date) < now).length;

  const stats = [
    {
      icon: BookOpen,
      label: 'Currently Borrowed',
      value: active.length,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: AlertTriangle,
      label: 'Overdue',
      value: overdueCount,
      color: overdueCount > 0 ? 'text-destructive' : 'text-muted-foreground',
      bg: overdueCount > 0 ? 'bg-destructive/10' : 'bg-muted/30',
    },
    {
      icon: CheckCircle2,
      label: 'Books Returned',
      value: history.length,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: IndianRupee,
      label: 'Total Fines Paid',
      value: `₹${totalFinesPaid.toFixed(2)}`,
      color: totalFinesPaid > 0 ? 'text-amber-500' : 'text-muted-foreground',
      bg: totalFinesPaid > 0 ? 'bg-amber-500/10' : 'bg-muted/30',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">My Borrowed Books</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your reading history and due dates</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshBorrowedBooks}
          disabled={loading}
          className="gap-2 transition-all duration-200 hover:shadow-md"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default border-border/50">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overdue Alert Banner */}
      {overdueCount > 0 && (
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 animate-fade-in">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">
              {overdueCount} book{overdueCount > 1 ? 's are' : ' is'} overdue!
            </p>
            <p className="text-xs opacity-80">Please return them as soon as possible to avoid additional fines.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2 lg:w-80">
          <TabsTrigger value="active" className="gap-2 transition-all duration-200">
            <BookMarked className="h-4 w-4" />
            Active ({active.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2 transition-all duration-200">
            <History className="h-4 w-4" />
            History ({history.length})
          </TabsTrigger>
        </TabsList>

        {/* ── Active Borrows Tab ── */}
        <TabsContent value="active" className="mt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">Loading your books…</p>
            </div>
          ) : active.length === 0 ? (
            <div className="text-center py-20 animate-fade-in space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No active borrows</p>
              <p className="text-muted-foreground text-sm">You haven't borrowed any books yet. Head to the Catalog to explore!</p>
            </div>
          ) : (
            <div className="rounded-xl border overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold w-10">#</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Book</TableHead>
                    <TableHead className="text-primary-foreground font-semibold hidden md:table-cell">Genre</TableHead>
                    <TableHead className="text-primary-foreground font-semibold hidden sm:table-cell">
                      <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Borrowed</span>
                    </TableHead>
                    <TableHead className="text-primary-foreground font-semibold">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due Date</span>
                    </TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {active.map((b, idx) => {
                    const isOverdue = new Date(b.due_date) < now;
                    const daysLeft = getDaysLeft(b.due_date);
                    const isDueSoon = !isOverdue && daysLeft <= 2;

                    return (
                      <TableRow
                        key={b.id}
                        className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                      >
                        <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>

                        {/* Book info with optional cover */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {b.book_cover ? (
                              <img
                                src={b.book_cover}
                                alt={b.book_title}
                                className="h-12 w-9 object-cover rounded shadow-sm shrink-0 hidden sm:block"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                            ) : (
                              <div className="h-12 w-9 bg-muted/40 rounded flex items-center justify-center shrink-0 hidden sm:flex">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-foreground leading-tight">{b.book_title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{b.book_author}</p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {b.book_genre ? (
                            <Badge variant="outline" className="text-xs font-normal">{b.book_genre}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                          {formatDate(b.borrow_date)}
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className={`text-sm font-medium ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-amber-500' : 'text-foreground'}`}>
                              {formatDate(b.due_date)}
                            </p>
                            <p className={`text-xs mt-0.5 ${isOverdue ? 'text-destructive/80' : isDueSoon ? 'text-amber-500/80' : 'text-muted-foreground'}`}>
                              {isOverdue
                                ? `${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''} overdue`
                                : daysLeft === 0
                                ? 'Due today!'
                                : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          {isOverdue ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" /> Overdue
                            </Badge>
                          ) : isDueSoon ? (
                            <Badge className="bg-amber-500/15 text-amber-600 border border-amber-300 gap-1">
                              <Clock className="h-3 w-3" /> Due Soon
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-200 gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Active
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* ── History Tab ── */}
        <TabsContent value="history" className="mt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <History className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">Loading history…</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-20 animate-fade-in space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
                <History className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No history yet</p>
              <p className="text-muted-foreground text-sm">Returned books will show up here.</p>
            </div>
          ) : (
            <>
              {/* Summary banner */}
              <div className="mb-4 p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-muted-foreground">Total returned:</span>
                  <span className="font-semibold text-foreground">{history.length} books</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-amber-500" />
                  <span className="text-muted-foreground">Total fines paid:</span>
                  <span className="font-semibold text-foreground">₹{totalFinesPaid.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">Total amount paid:</span>
                  <span className="font-semibold text-foreground">₹{totalPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="rounded-xl border overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-primary-foreground font-semibold w-10">#</TableHead>
                      <TableHead className="text-primary-foreground font-semibold">Book</TableHead>
                      <TableHead className="text-primary-foreground font-semibold hidden md:table-cell">Genre</TableHead>
                      <TableHead className="text-primary-foreground font-semibold hidden sm:table-cell">
                        <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Borrowed</span>
                      </TableHead>
                      <TableHead className="text-primary-foreground font-semibold">
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Returned</span>
                      </TableHead>
                      <TableHead className="text-primary-foreground font-semibold">
                        <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> Charges</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((b, idx) => {
                      const hasFine = (b.fine ?? 0) > 0;
                      return (
                        <TableRow
                          key={b.id}
                          className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                        >
                          <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>

                          {/* Book info */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {b.book_cover ? (
                                <img
                                  src={b.book_cover}
                                  alt={b.book_title}
                                  className="h-12 w-9 object-cover rounded shadow-sm shrink-0 hidden sm:block opacity-70"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : (
                                <div className="h-12 w-9 bg-muted/40 rounded flex items-center justify-center shrink-0 hidden sm:flex">
                                  <BookOpen className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-foreground leading-tight">{b.book_title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{b.book_author}</p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="hidden md:table-cell">
                            {b.book_genre ? (
                              <Badge variant="outline" className="text-xs font-normal">{b.book_genre}</Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>

                          <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                            {formatDate(b.borrow_date)}
                          </TableCell>

                          <TableCell className="text-sm text-foreground">
                            {b.return_date ? formatDate(b.return_date) : '—'}
                          </TableCell>

                          <TableCell>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                ₹{((b.price || 0) + (b.fine || 0)).toFixed(2)}
                              </p>
                              {hasFine && (
                                <p className="text-xs text-amber-500 mt-0.5">
                                  incl. ₹{(b.fine ?? 0).toFixed(2)} fine
                                </p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooks;
