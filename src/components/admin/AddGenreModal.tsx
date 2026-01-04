import { useForm } from 'react-hook-form';
import apiClient from '../../lib/axios';

interface AddGenreModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface GenreForm {
  name: string;
  description: string;
}

export function AddGenreModal({ onClose, onSuccess }: AddGenreModalProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<GenreForm>();

  const onSubmit = async (data: GenreForm) => {
    try {
      await apiClient.post('/genres', data);
      alert('Жанр додано!');
      onSuccess();
    } catch (error) {
      alert('Помилка додавання жанру');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
        <h2 className="text-2xl font-serif font-bold text-[#2D332F] mb-6">Додати Жанр</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Назва жанру</label>
            <input {...register('name', { required: true })} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0]" placeholder="Детектив" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Опис (необов'язково)</label>
            <textarea {...register('description')} className="w-full px-4 py-3 rounded-lg bg-[#F5F5F0]" placeholder="Заплутані історії..." />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#2D332F] text-white py-3 rounded-xl font-medium hover:bg-[#3A5A40] transition">
            {isSubmitting ? '...' : 'Зберегти Жанр'}
          </button>
        </form>
      </div>
    </div>
  );
}