import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction, register as registerAction, logout as logoutAction, fetchUser } from '@/store/slices/authSlice.js';

interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: 'librarian' | 'reader';
    created_at: string;
    books_borrowed: number;
    libraries_visited: number;
    total_books_read: number;
    favorite_genre?: string;
    member_since?: string;
    library?: any;
    avatar_url?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

// Map backend role to loveable role
function mapRole(role: string): 'librarian' | 'reader' {
    return role === 'Admin' ? 'librarian' : 'reader';
}

function mapUser(backendUser: any): AuthUser | null {
    if (!backendUser) return null;
    return {
        id: backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: mapRole(backendUser.role),
        created_at: backendUser.createdAt || new Date().toISOString(),
        books_borrowed: 0,
        libraries_visited: 0,
        total_books_read: 0,
        member_since: backendUser.createdAt?.split('T')[0],
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<any>();
    const { user: backendUser, isAuthenticated, loading } = useSelector((state: any) => state.auth);
    const [initialLoad, setInitialLoad] = React.useState(true);

    useEffect(() => {
        dispatch(fetchUser()).finally(() => setInitialLoad(false));
    }, [dispatch]);

    const user = mapUser(backendUser);
    const isActuallyLoading = loading || initialLoad;

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        // @ts-expect-error - TS infers 0 arguments from JS createAsyncThunk
        const result = await dispatch(loginAction({ email, password }));
        return !result.error;
    }, [dispatch]);

    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        // @ts-expect-error - TS infers 0 arguments from JS createAsyncThunk
        const result = await dispatch(registerAction({ name, email, password }));
        return !result.error;
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading: isActuallyLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
