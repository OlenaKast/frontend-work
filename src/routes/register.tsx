import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../lib/axios';

const registerSchema = z.object({
  firstName: z.string().min(2, "Ім'я має бути мінімум 2 літери"),
  lastName: z.string().min(2, "Прізвище має бути мінімум 2 літери"),
  patronymic: z.string().optional(),
  email: z.string().email("Невірний формат email"),
  phoneNumber: z.string().min(10, "Невірний номер"),
  password: z.string().min(4, "Пароль мінімум 4 символи"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await apiClient.post('/auth/register', data);

      alert("Реєстрація успішна! Тепер увійдіть.");
      navigate({ to: '/login' });

    } catch (err: any) {
      console.error(err);
      setError('root', { 
        message: err.response?.data?.message || 'Помилка реєстрації' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-center text-[#2D332F] mb-6">Реєстрація</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Ім'я</label>
              <input {...register('firstName')} className="w-full px-3 py-2 border rounded-lg" placeholder="Олена" />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Прізвище</label>
              <input {...register('lastName')} className="w-full px-3 py-2 border rounded-lg" placeholder="Каст" />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
             <label className="text-sm font-medium text-gray-700">По батькові</label>
             <input {...register('patronymic')} className="w-full px-3 py-2 border rounded-lg" placeholder="Вікторівна" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input {...register('email')} type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="email@example.com" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Телефон</label>
            <input {...register('phoneNumber')} className="w-full px-3 py-2 border rounded-lg" placeholder="+380..." />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Пароль</label>
            <input {...register('password')} type="password" className="w-full px-3 py-2 border rounded-lg" placeholder="••••" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {errors.root && <div className="text-red-500 text-center text-sm">{errors.root.message}</div>}

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#2D332F] text-white py-3 rounded-lg hover:bg-opacity-90 transition">
            {isSubmitting ? 'Реєструємо...' : 'Зареєструватися'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Вже є акаунт? <Link to="/login" className="text-[#2D332F] font-semibold hover:underline">Увійти</Link>
        </div>
      </div>
    </div>
  );
}