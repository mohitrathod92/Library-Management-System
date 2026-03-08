import { Book, BorrowedBook, UserProfile } from '@/types';

export const mockBooks: Book[] = [
  { id: '1', title: 'The Silent Patient', author: 'Alex Michaelides', description: 'A psychological thriller about a woman who stops speaking after being accused of her husband\'s murder.', price: 3.99, quantity: 10, available: true, genre: 'Thriller', cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '2', title: 'Atomic Habits', author: 'James Clear', description: 'An easy & proven way to build good habits & break bad ones.', price: 4.49, quantity: 5, available: true, genre: 'Self-Help', cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '3', title: 'The Midnight Library', author: 'Matt Haig', description: 'Between life and death there is a library, and within that library, the shelves go on forever.', price: 3.99, quantity: 12, available: true, genre: 'Fiction', cover_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '4', title: 'The Alchemist', author: 'Paulo Coelho', description: 'A magical story about following your dreams.', price: 2.49, quantity: 19, available: true, genre: 'Fiction', cover_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '5', title: 'Project Hail Mary', author: 'Andy Weir', description: 'A lone astronaut must save the earth from disaster.', price: 5.00, quantity: 14, available: true, genre: 'Sci-Fi', cover_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '6', title: 'Educated', author: 'Tara Westover', description: 'A memoir about a woman who grows up in a survivalist family.', price: 4.29, quantity: 2, available: true, genre: 'Memoir', cover_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '7', title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', description: 'A counterintuitive approach to living a good life.', price: 3.30, quantity: 99, available: true, genre: 'Self-Help', cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '8', title: 'Where the Crawdads Sing', author: 'Delia Owens', description: 'A coming-of-age murder mystery set in the marshes of North Carolina.', price: 3.29, quantity: 32, available: true, genre: 'Fiction', cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '9', title: 'The Psychology of Money', author: 'Morgan Housel', description: 'Timeless lessons on wealth, greed, and happiness.', price: 2.49, quantity: 19, available: true, genre: 'Finance', cover_url: 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=300&h=400&fit=crop', created_at: '2025-01-15' },
  { id: '10', title: 'The 5 AM Club', author: 'Robin Sharma', description: 'Own your morning, elevate your life.', price: 3.70, quantity: 43, available: true, genre: 'Self-Help', cover_url: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop', created_at: '2025-01-15' },
];

export const mockUsers: UserProfile[] = [
  { id: '1', name: 'Muhammad Zeeshan Khan', email: 'codewithzeeshu12@gmail.com', role: 'reader', created_at: '2025-02-08 19:23:45', books_borrowed: 2, libraries_visited: 3, total_books_read: 15, favorite_genre: 'Thriller', member_since: '2024-06-15' },
  { id: '2', name: 'John Doe', email: 'jhon@gmail.com', role: 'reader', created_at: '2025-02-21 10:41:36', books_borrowed: 10, libraries_visited: 5, total_books_read: 42, favorite_genre: 'Fiction', member_since: '2023-11-20' },
  { id: '3', name: 'Michael Scofield', email: 'mike@gmail.com', role: 'reader', created_at: '2025-02-21 10:42:48', books_borrowed: 0, libraries_visited: 1, total_books_read: 3, favorite_genre: 'Thriller', member_since: '2025-01-10' },
  { id: '4', name: 'Jackal', email: 'jackal@gmail.com', role: 'reader', created_at: '2025-02-21 10:43:15', books_borrowed: 0, libraries_visited: 2, total_books_read: 8, favorite_genre: 'Sci-Fi', member_since: '2024-09-05' },
  { id: '5', name: 'Tom Cruise', email: 'tom@gmail.com', role: 'reader', created_at: '2025-02-21 10:43:48', books_borrowed: 0, libraries_visited: 1, total_books_read: 0, member_since: '2025-02-01' },
  { id: '6', name: 'Tony Stark', email: 'stark@gmail.com', role: 'reader', created_at: '2025-02-21 10:44:14', books_borrowed: 0, libraries_visited: 4, total_books_read: 28, favorite_genre: 'Technology', member_since: '2023-03-15' },
  { id: '7', name: 'Alan', email: 'alan@gmail.com', role: 'reader', created_at: '2025-02-21 10:45:15', books_borrowed: 0, libraries_visited: 1, total_books_read: 5, favorite_genre: 'Philosophy', member_since: '2024-12-01' },
  { id: '8', name: 'Muhammad Zeeshan Khan', email: 'merndeveloper4@gmail.com', role: 'reader', created_at: '2025-02-21 11:15:39', books_borrowed: 0, libraries_visited: 2, total_books_read: 12, favorite_genre: 'Self-Help', member_since: '2024-07-20' },
];

export const mockBorrowedBooks: BorrowedBook[] = [
  { id: '1', book_id: '1', user_id: '1', book_title: 'The Silent Patient', book_author: 'Alex Michaelides', borrower_name: 'Muhammad Zeeshan Khan', borrower_email: 'codewithzeeshu12@gmail.com', price: 10, borrow_date: '2025-02-10 21:09:25', due_date: '2025-02-26', returned: false },
  { id: '2', book_id: '2', user_id: '2', book_title: 'Atomic Habits', book_author: 'James Clear', borrower_name: 'John Doe', borrower_email: 'jhon@gmail.com', price: 3.99, borrow_date: '2025-02-21 11:06:28', due_date: '2025-02-28', returned: true },
  { id: '3', book_id: '3', user_id: '2', book_title: 'The Midnight Library', book_author: 'Matt Haig', borrower_name: 'John Doe', borrower_email: 'jhon@gmail.com', price: 4.49, borrow_date: '2025-02-21 11:06:33', due_date: '2025-02-28', returned: true },
  { id: '4', book_id: '4', user_id: '2', book_title: 'The Alchemist', book_author: 'Paulo Coelho', borrower_name: 'John Doe', borrower_email: 'jhon@gmail.com', price: 3.99, borrow_date: '2025-02-21 11:06:37', due_date: '2025-02-28', returned: true },
  { id: '5', book_id: '5', user_id: '2', book_title: 'Project Hail Mary', book_author: 'Andy Weir', borrower_name: 'John Doe', borrower_email: 'jhon@gmail.com', price: 2.49, borrow_date: '2025-02-21 11:06:41', due_date: '2025-02-28', returned: false },
  { id: '6', book_id: '6', user_id: '2', book_title: 'Educated', book_author: 'Tara Westover', borrower_name: 'John Doe', borrower_email: 'jhon@gmail.com', price: 5, borrow_date: '2025-02-21 11:06:45', due_date: '2025-02-28', returned: false },
];

export const mockAdminUser: UserProfile = {
  id: 'admin-1',
  name: 'Muhammad Zeeshan Khan',
  email: 'admin@bookworm.com',
  role: 'librarian',
  created_at: '2025-01-01',
  books_borrowed: 0,
  libraries_visited: 0,
  total_books_read: 0,
  library: {
    name: 'BookWorm Central Library',
    address: '123 Library Street, Knowledge City, KC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@bookworm-library.com',
    established: '2020-01-15',
    totalCapacity: 50000,
  },
};

export const inspirationalQuotes = [
  { text: "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character.", author: "BookWorm Team" },
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
];
