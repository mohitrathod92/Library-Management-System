import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Shield, User, TrendingUp, BarChart3, Building2 } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { inspirationalQuotes } from '@/data/mockData';
import { Navigate } from 'react-router-dom';
import { BOOK_CATEGORIES } from '@/types';

const Dashboard = () => {
  const { user } = useAuth();
  const { books, borrowedBooks, users } = useLibrary();

  if (user?.role !== 'librarian') {
    return <Navigate to="/catalog" replace />;
  }

  const totalBorrowed = borrowedBooks.filter(b => !b.returned).length;
  const totalReturned = borrowedBooks.filter(b => b.returned).length;
  const totalAdmins = 3;
  const quote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const pieData = [
    { name: 'Borrowed', value: totalBorrowed || 1 },
    { name: 'Returned', value: totalReturned || 1 },
  ];
  const COLORS = ['hsl(0, 0%, 15%)', 'hsl(0, 0%, 55%)'];

  // Genre distribution for bar chart
  const genreCounts = books.reduce((acc, b) => {
    const g = b.genre || 'Other';
    acc[g] = (acc[g] || 0) + b.quantity;
    return acc;
  }, {} as Record<string, number>);
  const genreData = Object.entries(genreCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);

  const stats = [
    { icon: Users, value: users.length, label: 'Total Users', color: 'bg-primary/5' },
    { icon: BookOpen, value: books.length, label: 'Total Books', color: 'bg-primary/5' },
    { icon: Shield, value: totalAdmins, label: 'Total Admins', color: 'bg-primary/5' },
    { icon: TrendingUp, value: totalBorrowed, label: 'Active Borrows', color: 'bg-primary/5' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Borrow Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" stroke="none">
                  {pieData.map((_, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
                </Pie>
                <Legend verticalAlign="bottom" height={36} formatter={(value: string) => <span className="text-xs text-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-2 transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Books by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(0,0%,90%)' }} />
                <Bar dataKey="value" fill="hsl(0,0%,15%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Profile Card */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{user?.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Librarian / Admin</p>
            {user?.library && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {user.library.name}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quote */}
        <Card className="lg:col-span-2 bg-muted/30 transition-all duration-300 hover:shadow-lg group">
          <CardContent className="p-8 md:p-12 flex flex-col justify-center h-full">
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic transition-transform duration-500 group-hover:translate-x-1">
              "{quote.text}"
            </p>
            <p className="text-sm text-muted-foreground mt-4 text-right">~ {quote.author}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
