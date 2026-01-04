import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, logout, userRole, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userData = {
    name: user ? `${user.firstName} ${user.lastName}` : "Гість",
    phone: user?.phoneNumber || ""
  };

  const MenuItem = ({ text, to }: { text: string; to?: string }) => {
    if (to) {
      return (
        <Link 
          to={to} 
          onClick={() => setIsMenuOpen(false)} 
          className="block text-lg font-medium py-2 hover:text-gray-300 transition"
        >
          {text}
        </Link>
      );
    }
    return (
      <div className="block text-lg font-medium py-2 cursor-pointer hover:text-gray-300 transition opacity-70">
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2D332F] overflow-x-hidden">
      
      <aside 
        className={`fixed top-0 left-0 h-full w-[350px] bg-[#262D26] text-white z-[60] shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          
          <div className="flex justify-between items-start mb-8">
             <div className="w-40">
                <img src="/logo2.png" alt="AgathaRio" className="w-full h-auto object-contain" />
             </div>
             
             <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
          </div>

          {isAuthenticated ? (
            <div className="bg-[#343A34] p-4 rounded-2xl mb-8 flex items-center gap-4 border border-white/5 shadow-lg">
               <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               </div>
               <div className="overflow-hidden">
                 <p className="font-medium text-lg text-white truncate">{userData.name}</p>
                 <p className="text-sm text-gray-400 font-light truncate">{userData.phone}</p>
               </div>
            </div>
          ) : (
            <div className="bg-[#343A34] p-6 rounded-2xl mb-8 text-center border border-white/5 shadow-lg">
               <p className="text-gray-300 mb-3 text-sm">Увійдіть в акаунт</p>
               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full bg-white text-[#262D26] py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                 Увійти
               </Link>
            </div>
          )}

          <nav className="flex flex-col gap-1 mb-8 pl-2">
            <MenuItem text="Категорії книг" to="/books" />
            <MenuItem text="Сертифікати" />
            <MenuItem text="Акції" />
            <div className="h-4"></div>
            <MenuItem text="Про AgathaRio" to="/about" />
            <MenuItem text="Доставка та оплата" />
            <MenuItem text="Контакти" />
            <div className="h-4"></div>
            <MenuItem text="Як стати автором" />

             {userRole === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="mt-4 text-yellow-400 font-bold border border-yellow-400/30 p-3 rounded-xl text-center hover:bg-yellow-400/10 transition">
                  Адмін Панель
                </Link>
             )}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-white/10">
             {isAuthenticated ? (
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }} 
                  className="w-full bg-[#343A34] text-white py-3 rounded-xl flex items-center justify-between px-6 hover:bg-[#3E453E] transition group shadow-lg"
                >
                  <span className="font-medium">Вийти з аккаунту</span>
                  <svg className="transform group-hover:translate-x-1 transition" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
             ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-[#343A34] text-white py-3 rounded-xl flex items-center justify-between px-6 hover:bg-[#3E453E] transition group shadow-lg"
                >
                  <span className="font-medium">Увійти з аккаунту</span>
                  <svg className="transform group-hover:translate-x-1 transition" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
             )}
          </div>
        </div>
      </aside>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className={`transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-[350px]' : 'translate-x-0'}`}>
        
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-[80px] flex items-center px-4 md:px-8 justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition text-[#2D332F]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <Link to="/" className="flex items-center gap-3">
               <img src="/logo.png" alt="AgathaRio" className="h-10 w-auto" />
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             </div>
             <input type="text" placeholder="Знайти книгу..." className="w-full bg-[#F5F5F0] text-gray-700 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#2D332F] transition" />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
            <Link to={isAuthenticated ? "/profile" : "/login"} className={`p-2 rounded-full transition flex items-center justify-center ${isAuthenticated ? 'bg-[#2D332F] text-white' : 'hover:bg-gray-100'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <TanStackRouterDevtools />
      </div>

    </div>
  );
}