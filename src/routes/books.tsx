import { createFileRoute } from '@tanstack/react-router';
import { useBooks } from '../features/books//components/api';
import { BookCard } from '../features/books/components/BookCard';


export const Route = createFileRoute('/books')({
  component: BooksPage,
});

function BooksPage() {

  const { data: books, isLoading, isError } = useBooks();


  const cardColors = ['bg-[#D8C6D8]', 'bg-[#F2C078]', 'bg-[#7E7EE8]', 'bg-[#3A5A40]'];


  if (isLoading) return <div className="p-10 text-center">Завантаження книг... 📚</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Помилка з'єднання з сервером 😢</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-serif font-bold mb-10 text-[#2D332F]">Новинки книг</h1>

      {books?.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-400 mb-4">Тут поки порожньо...</p>
          <p className="text-sm text-gray-400">Створи першу книгу через Postman!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books?.map((book, index) => (
          <BookCard 
            key={book.id} 
            book={book} 
            color={cardColors[index % cardColors.length]} 
          />
        ))}
      </div>
    </div>
  );
}