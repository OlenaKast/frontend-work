import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, userRole, user } = useAuth();
  
  const userData = {
    firstName: user?.firstName || "Гість",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || ""
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F5F5F0] pt-8 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        <div className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
          
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#2D332F] text-white rounded-full flex items-center justify-center text-4xl font-serif mx-auto mb-4 shadow-lg">
              {userData.firstName.charAt(0)}
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2D332F]">{userData.firstName} {userData.lastName}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{userRole || 'Клієнт'}</p>
          </div>

          <nav className="space-y-3 flex-1">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-[#F5F5F0] text-[#2D332F] font-bold transition">
              👤 Особисті дані
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition flex items-center gap-3">
              📦 Мої замовлення
            </button>
            
            {userRole === 'author' && (
              <>
                <div className="my-4 border-t border-gray-100"></div>
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Кабінет Автора</p>
                
                <Link to="/my-scripts" className="block w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 text-[#2D332F] font-medium transition flex items-center gap-3">
                  📝 Мої рукописи
                </Link>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 text-[#2D332F] font-medium transition flex items-center gap-3">
                  ✒️ Редагувати біографію
                </button>
              </>
            )}

             {userRole === 'admin' && (
                <Link to="/admin" className="block w-full text-left px-4 py-3 rounded-xl border border-dashed border-[#2D332F] text-[#2D332F] font-bold mt-6 hover:bg-[#2D332F] hover:text-white transition">
                  ⚡ Панель Адміна
                </Link>
             )}
          </nav>

          <div className="border-t border-gray-100 my-6"></div>

          <button 
            onClick={logout} 
            className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Вийти з акаунту
          </button>
        </div>

        <div className="md:col-span-3 space-y-8">
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-serif font-bold text-[#2D332F]">Особисті дані</h2>
               <span className="text-sm text-gray-400">ID: 839201</span>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Ім'я</label>
                <input type="text" defaultValue={userData.firstName} className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Прізвище</label>
                <input type="text" defaultValue={userData.lastName} className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Номер телефону</label>
                <input type="tel" defaultValue={userData.phone} className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" defaultValue={userData.email} disabled className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed" />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button className="bg-[#2D332F] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3A5A40] transition shadow-lg shadow-gray-200">
                  Зберегти зміни
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-[#2D332F] mb-6">Пароль та Безпека</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Поточний пароль</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Новий пароль</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Підтвердження</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-transparent focus:bg-white focus:border-[#2D332F] focus:ring-0 transition border" />
              </div>
              
              <div className="md:col-span-2 flex justify-end mt-4">
                <button className="border-2 border-[#2D332F] text-[#2D332F] px-8 py-3 rounded-lg font-medium hover:bg-[#F9F9F9] transition">
                  Оновити пароль
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}