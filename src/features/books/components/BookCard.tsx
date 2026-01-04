import { Link } from '@tanstack/react-router';
import { Book } from './api';

interface BookCardProps {
  book: Book;
  color?: string;
}

export function BookCard({ book, color = 'bg-[#E5E0D8]' }: BookCardProps) {
  
  const hasImage = book.imageUrl && !book.imageUrl.includes('No+Cover');

  return (
    <Link 
      to="/$bookId"
      params={{ bookId: book.id.toString() }}
      className="flex flex-col w-full max-w-[300px] group cursor-pointer"
    >
      <div className={`relative aspect-[2/3] w-full rounded-[20px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ${hasImage ? 'bg-gray-200' : color}`}>
        
        {hasImage ? (
          <img 
            src={book.imageUrl} 
            alt={book.title}
            className="w-full h-full object-cover" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          /* ЗАГЛУШКА */
          <>
             <div className="absolute top-[80px] left-0 w-full opacity-50 pointer-events-none">
                <svg viewBox="0 0 300 100" fill="none" stroke="currentColor" className="text-gray-800 w-full">
                  <path d="M0 20 C 100 60, 200 0, 300 40" strokeWidth="1" />
                </svg>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pt-20">
               <h3 className="text-2xl font-serif text-[#2D332F] mb-1 leading-tight">{book.title}</h3>
               <p className="text-[#2D332F] opacity-70 font-light text-sm">{book.authorName}</p>
             </div>
          </>
        )}

      </div>

      <div className="mt-4 px-1">
        <h4 className="text-lg font-medium text-[#2D332F] truncate">{book.title}</h4>
        <p className="text-xs text-gray-500 mb-2">{book.authorName}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#2D332F]">{book.price} ₴</span>
          <div className="flex items-center text-yellow-500 text-sm font-bold gap-1">⭐ {book.rating}</div>
        </div>
      </div>
    </Link>
  );
}