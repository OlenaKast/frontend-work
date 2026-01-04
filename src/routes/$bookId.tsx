import { createFileRoute } from '@tanstack/react-router';
import { useBook } from '../features/books/components/api';

export const Route = createFileRoute('/$bookId')({
  component: BookPage,
});

function BookPage() {
  const { bookId } = Route.useParams();
  
  const { data: book, isLoading, error } = useBook(bookId);

  if (isLoading) return <div className="p-10 text-center">Завантаження...</div>;
  if (error || !book) return <div className="p-10 text-center text-red-500">Книгу не знайдено</div>;

  return (
    <div className="bg-[#F5F5F0] min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-10">
        
        {/* Фото */}
        <div className="w-full md:w-1/3">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[2/3] relative">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">Немає фото</div>
            )}
          </div>
        </div>

        {/* Інфо */}
        <div className="w-full md:w-2/3 space-y-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2D332F]">{book.title}</h1>
            <p className="text-xl text-gray-500 mt-2">{book.authorName}</p>
          </div>
          <div className="text-3xl font-bold text-[#2D332F]">{book.price} ₴</div>
          <div className="prose max-w-none text-gray-600">
             <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}