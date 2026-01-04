import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../lib/axios';

const loginSchema = z.object({
  email: z.string().email("Невірний формат email"),
  password: z.string().min(4, "Пароль має бути мінімум 4 символи"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      
      const { token, user } = response.data;
 
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', user.role || 'client');
      localStorage.setItem('user_data', JSON.stringify(user));
      if (user.role === 'admin') {
         navigate({ to: '/admin' }); 
         alert(`Вітаємо, Адміністратор ${user.fullName || user.firstName}!`);
      } else {
         navigate({ to: '/' });
      }

    } catch (err: any) {
      console.error(err);
      setError('root', { 
        message: err.response?.data?.message || 'Невірний логін або пароль' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <h1 className="text-3xl font-serif font-bold text-center text-[#2D332F] mb-2">Вхід</h1>
        <p className="text-center text-gray-500 mb-8">Раді бачити вас знову в AgathaRio</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              {...register('email')}
              type="email" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D332F] transition"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input 
              {...register('password')}
              type="password" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D332F] transition"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {errors.root && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {errors.root.message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#2D332F] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Входимо...' : 'Увійти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Ще немає акаунту?{' '}
          <Link to="/register" className="text-[#2D332F] font-semibold hover:underline">
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}