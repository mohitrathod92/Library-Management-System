import { LayoutDashboard, BookOpen, BookMarked, Users, UserPlus, LogOut, Library, RotateCcw, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const librarianItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Books', url: '/books', icon: BookOpen },
  { title: 'Catalog', url: '/catalog', icon: BookMarked },
  { title: 'Borrowed Books', url: '/borrowed-books', icon: RotateCcw },
  { title: 'Users', url: '/users', icon: Users },
  { title: 'Add New Admin', url: '/add-admin', icon: UserPlus },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const readerItems = [
  { title: 'Catalog', url: '/catalog', icon: BookMarked },
  { title: 'My Books', url: '/my-books', icon: BookOpen },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { user, logout } = useAuth();

  const items = user?.role === 'librarian' ? librarianItems : readerItems;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex flex-col items-center py-6 px-4">
        <Library className="h-10 w-10 text-sidebar-primary mb-2 transition-transform duration-300 hover:rotate-12" />
        {!collapsed && (
          <div className="text-center animate-fade-in">
            <h1 className="text-xl font-bold text-sidebar-primary tracking-wide font-display">BookWorm</h1>
            <p className="text-[10px] text-sidebar-foreground/60 tracking-[0.3em] uppercase">Library</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-primary transition-all duration-200 hover:translate-x-1"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-md text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-sidebar-primary transition-all duration-200 hover:translate-x-1"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
