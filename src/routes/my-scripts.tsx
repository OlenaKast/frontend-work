import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/my-scripts')({
  component: MyScriptsPage,
});

function MyScriptsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F0] p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2D332F]">Мої Рукописи</h1>
            <p className="text-gray-500 mt-2">Керуйте своїми текстами та подавайте їх на розгляд</p>
          </div>
          <Link to="/profile" className="text-gray-500 hover:text-[#2D332F]">
            &larr; Назад у профіль
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
          </div>
          
          <h3 className="text-xl font-bold text-[#2D332F] mb-2">У вас поки немає рукописів</h3>
          <p className="text-gray-500 max-w-md mb-8">
            Завантажте свій перший текст, щоб редактори AgathaRio могли з ним ознайомитись.
          </p>
          
          <button className="bg-[#2D332F] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#3A5A40] transition shadow-lg">
            + Додати новий рукопис
          </button>

        </div>

      </div>
    </div>
  );
}