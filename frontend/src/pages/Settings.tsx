import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Building2, BookOpen, MapPin, Phone, Mail, Calendar, Heart, Library } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAuth();
  const isLibrarian = user?.role === 'librarian';

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground font-display">Profile & Settings</h1>

      {/* Profile Card */}
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="h-24 bg-gradient-to-r from-primary/10 via-muted to-primary/5" />
        <CardContent className="relative pt-0 pb-6 px-6">
          <div className="flex items-end gap-4 -mt-10">
            <div className="h-20 w-20 rounded-full bg-card border-4 border-background flex items-center justify-center shadow-md">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="pb-1">
              <h2 className="text-lg font-bold text-foreground">{user?.name}</h2>
              <Badge variant="outline" className="text-xs capitalize">{isLibrarian ? 'Librarian / Admin' : 'Reader'}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Full Name</Label>
              <Input defaultValue={user?.name} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Email</Label>
              <Input defaultValue={user?.email} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Role</Label>
              <Input defaultValue={isLibrarian ? 'Admin / Librarian' : 'Reader'} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Member Since</Label>
              <Input defaultValue={user?.member_since || user?.created_at?.split(' ')[0] || '-'} readOnly className="bg-muted" />
            </div>
          </div>
          <Button variant="outline" className="mt-4 transition-all duration-200 hover:scale-105 active:scale-95" onClick={() => toast.info('Profile editing will be available with backend integration')}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Librarian: Library Details */}
      {isLibrarian && user?.library && (
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Library Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <Library className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Library Name</p>
                  <p className="text-sm font-medium text-foreground">{user.library.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">{user.library.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{user.library.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.library.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Established</p>
                  <p className="text-sm font-medium text-foreground">{user.library.established}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors duration-200 hover:bg-muted">
                <BookOpen className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Capacity</p>
                  <p className="text-sm font-medium text-foreground">{user.library.totalCapacity.toLocaleString()} books</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reader: Reading Stats */}
      {!isLibrarian && (
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Reading Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Library, label: 'Libraries Visited', value: user?.libraries_visited || 0 },
                { icon: BookOpen, label: 'Total Books Read', value: user?.total_books_read || 0 },
                { icon: BookOpen, label: 'Currently Borrowed', value: user?.books_borrowed || 0 },
                { icon: Heart, label: 'Favorite Genre', value: user?.favorite_genre || 'N/A' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Settings;
