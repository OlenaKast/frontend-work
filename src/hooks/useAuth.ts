import { useNavigate } from '@tanstack/react-router';

// 1. Інтерфейс (Паспорт об'єкта)
export interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  phoneNumber?: string;
  fullName?: string;
}

export function useAuth() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('user_role');
  
  const userStr = localStorage.getItem('user_data');
  
  // 👇 2. ВИПРАВЛЕННЯ: додали ( ... as User)
  // Ми кажемо: "Я мамою клянусь, що результат JSON.parse — це User"
  const user: User | null = userStr ? (JSON.parse(userStr) as User) : null;

  const isAuthenticated = !!token;

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
    navigate({ to: '/login' });
    window.location.reload();
  };

  return { isAuthenticated, userRole, user, logout };
}