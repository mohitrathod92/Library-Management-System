import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store.js";
import { AuthProvider } from "@/contexts/AuthContext";
import { LibraryProvider } from "@/contexts/LibraryContext";
import { AppLayout } from "@/components/layout/AppLayout";

// Keep existing Login and Register pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// New loveable pages
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Catalog from "./pages/Catalog";
import BorrowedBooks from "./pages/BorrowedBooks";
import Users from "./pages/Users";
import AddAdmin from "./pages/AddAdmin";
import MyBooks from "./pages/MyBooks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <AuthProvider>
                    <LibraryProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                            <Routes>
                                {/* Keep existing Login/Register */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/" element={<Navigate to="/login" replace />} />

                                {/* Loveable layout routes */}
                                <Route element={<AppLayout />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/books" element={<Books />} />
                                    <Route path="/catalog" element={<Catalog />} />
                                    <Route path="/borrowed-books" element={<BorrowedBooks />} />
                                    <Route path="/users" element={<Users />} />
                                    <Route path="/add-admin" element={<AddAdmin />} />
                                    <Route path="/my-books" element={<MyBooks />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </LibraryProvider>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    </Provider>
);

export default App;
