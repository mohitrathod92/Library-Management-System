export type UserRole = 'librarian' | 'reader';

export interface LibraryDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  established: string;
  totalCapacity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  books_borrowed: number;
  // Librarian-specific
  library?: LibraryDetails;
  // Reader-specific
  libraries_visited: number;
  total_books_read: number;
  favorite_genre?: string;
  member_since?: string;
}

export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Thriller',
  'Mystery',
  'Sci-Fi',
  'Fantasy',
  'Romance',
  'Self-Help',
  'Biography',
  'Memoir',
  'History',
  'Science',
  'Technology',
  'Finance',
  'Philosophy',
  'Poetry',
  'Children',
  'Young Adult',
  'Horror',
  'Comics',
] as const;

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  cover_url?: string;
  genre?: string;
  created_at: string;
}

export interface BorrowedBook {
  id: string;
  book_id: string;
  user_id: string;
  book_title: string;
  book_author: string;
  borrower_name: string;
  borrower_email: string;
  price: number;
  borrow_date: string;
  due_date: string;
  returned: boolean;
  return_date?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'info' | 'warning' | 'overdue';
  read: boolean;
  created_at: string;
}
