import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-white text-center px-4 pt-5">
      
      <div className="mb-6 max-w-[200px]">
         <img src="/logo.png" alt="AgathaRio" className="w-full" />
      </div>

      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl font-light">
        AgathaRio — це простір для історій, які не намагаються бути "зручними". <br className="hidden md:block" />
        Ми видаємо книги молодих авторів, нові голоси й тексти.
      </p>

      <div className="w-full max-w-3xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop" 
          alt="Відкрита книга" 
          className="w-full h-auto object-cover rounded-xl shadow-lg opacity-90"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-12 mt-4">
        <Link 
          to="/books" 
          className="bg-[#2D332F] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Перейти до покупок &rarr;
        </Link>
        <button className="border border-[#2D332F] text-[#2D332F] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
          Стати автором &gt;
        </button>
      </div>
    </div>
  );
}