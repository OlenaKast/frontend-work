import { useForm } from 'react-hook-form';
import apiClient from '../../lib/axios';

interface AddAuthorModalProps {
  onClose: () => void; 
  onSuccess: () => void; 
}

interface AuthorForm {
  firstName: string;
  lastName: string;
  bio: string;
}

export function AddAuthorModal({ onClose, onSuccess }: AddAuthorModalProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<AuthorForm>();

  const onSubmit = async (data: AuthorForm) => {
    try {
      await apiClient.post('/authors', data);
      alert('Автора успішно додано!');
      onSuccess();
    } catch (error) {
      alert('Помилка додавання автора');
      console.error(error);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-fade-in-up">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="text-2xl font-serif font-bold text-[#2D332F] mb-6">Додати Автора</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
            <input {...register('firstName', { required: true })} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border-transparent focus:bg-white focus:ring-2 focus:ring-[#2D332F] transition" placeholder="Агата" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
            <input {...register('lastName', { required: true })} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border-transparent focus:bg-white focus:ring-2 focus:ring-[#2D332F] transition" placeholder="Крісті" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Коротка біографія</label>
            <textarea {...register('bio')} rows={3} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0] border-transparent focus:bg-white focus:ring-2 focus:ring-[#2D332F] transition" placeholder="Відома англійська письменниця..." />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#2D332F] text-white py-3 rounded-xl font-medium hover:bg-[#3A5A40] transition shadow-lg mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Зберігаємо...' : 'Зберегти Автора'}
          </button>
        </form>
      </div>
    </div>
  );
}