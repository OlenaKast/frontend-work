import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { AddAuthorModal } from '../components/admin/AddAuthorModal';
import { AddGenreModal } from '../components/admin/AddGenreModal';
import { AddBookModal } from '../components/admin/AddBookModal';

import { useBooks } from '../features/books/components/api';
import { BookCard } from '../features/books/components/BookCard';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const { userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: books, isLoading, error, refetch } = useBooks();

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, userRole, navigate]);

  if (userRole !== 'admin') return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F0] p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2D332F]">Панель Адміністратора</h1>
            <p className="text-gray-500 mt-2">Керування контентом AgathaRio</p>
          </div>
          <Link to="/profile" className="px-6 py-2 border border-[#2D332F] rounded-lg text-[#2D332F] hover:bg-[#2D332F] hover:text-white transition">
            Повернутись у профіль
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 text-[#2D332F]">Дії</h2>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => setIsBookModalOpen(true)} 
              className="bg-[#2D332F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#3A5A40] transition shadow-lg flex items-center gap-2"
            >
              <span>+</span> Додати книгу
            </button>
            <button 
              onClick={() => setIsAuthorModalOpen(true)}
              className="bg-white border border-gray-200 text-[#2D332F] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center gap-2"
            >
              <span>+</span> Додати автора
            </button>
            <button 
              onClick={() => setIsGenreModalOpen(true)}
              className="bg-white border border-gray-200 text-[#2D332F] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center gap-2"
            >
              <span>+</span> Додати жанр
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D332F] mb-6">Ваші книги</h2>
          
          {isLoading && <p className="text-gray-500">Завантаження книг...</p>}
          {error && <p className="text-red-500">Помилка завантаження: {(error as Error).message}</p>}
          
          {!isLoading && books && books.length === 0 && (
             <p className="text-gray-500">Книг поки немає. Додайте першу!</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

      </div>

      {isAuthorModalOpen && <AddAuthorModal onClose={() => setIsAuthorModalOpen(false)} onSuccess={() => setIsAuthorModalOpen(false)} />}
      {isGenreModalOpen && <AddGenreModal onClose={() => setIsGenreModalOpen(false)} onSuccess={() => setIsGenreModalOpen(false)} />}
      {isBookModalOpen && (
        <AddBookModal 
          onClose={() => setIsBookModalOpen(false)} 
          onSuccess={() => {
            setIsBookModalOpen(false);
            refetch(); 
          }} 
        />
      )}

    </div>
  );
}