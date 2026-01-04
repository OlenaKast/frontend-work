import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '../../lib/axios';

interface AddBookModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface Author { 
  id: number; 
  fullName?: string; 
  firstName?: string; 
  lastName?: string; 
}
interface Genre { id: number; name: string; }

export function AddBookModal({ onClose, onSuccess }: AddBookModalProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    console.log("🚀 POCHALOS! Завантажуємо списки...");

    // 1. Автори
    apiClient.get('/authors')
      .then(res => {
        console.log("✅ АВТОРИ (з бекенду):", res.data);
        setAuthors(res.data);
      })
      .catch(err => console.error("❌ ПОМИЛКА АВТОРІВ:", err));

    // 2. Жанри
    apiClient.get('/genres')
      .then(res => {
        console.log("✅ ЖАНРИ (з бекенду):", res.data);
        setGenres(res.data);
      })
      .catch(err => console.error("❌ ПОМИЛКА ЖАНРІВ:", err));
  }, []);

  const onSubmit = async (data: any) => {
    try {
      console.log("📤 Відправляємо форму:", data);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('price', data.price);
      formData.append('authorId', data.authorId);
      formData.append('genreId', data.genreId);
      
      if(data.description) formData.append('description', data.description);
      if(data.year) formData.append('year', data.year);
      if(data.pages) formData.append('pages', data.pages);
      if(data.format) formData.append('format', data.format);
      if(data.sku) formData.append('sku', data.sku);
      if(data.isbn) formData.append('isbn', data.isbn);
      if(data.weight) formData.append('weight', data.weight);
      if(data.coverType) formData.append('coverType', data.coverType);
      
      if (data.cover && data.cover.length > 0) {
        formData.append('cover', data.cover[0]);
      }

      await apiClient.post('/books', formData);
      
      alert('🎉 Книгу успішно створено!');
      onSuccess();
    } catch (error) {
      console.error("❌ ПОМИЛКА СТВОРЕННЯ:", error);
      alert('Помилка при створенні книги.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative my-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl">&times;</button>
        
        <h2 className="text-2xl font-serif font-bold text-[#2D332F] mb-6">Додати нову книгу</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Назва книги *</label>
              <input {...register('title', { required: true })} className="w-full px-4 py-2 rounded-lg bg-[#F5F5F0]" placeholder="Назва" />
              
              {(errors as any).title && <span className="text-red-500 text-xs">Обов'язкове поле</span>}
            
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ціна (грн) *</label>
              <input type="number" {...register('price', { required: true })} className="w-full px-4 py-2 rounded-lg bg-[#F5F5F0]" placeholder="0.00" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Автор *</label>
              <select {...register('authorId', { required: true })} className="w-full px-4 py-2 rounded-lg bg-[#F5F5F0]">
                <option value="">-- Оберіть автора --</option>
                {authors.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.fullName ? a.fullName : (a.firstName ? `${a.firstName} ${a.lastName}` : `Автор #${a.id}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Жанр *</label>
              <select {...register('genreId', { required: true })} className="w-full px-4 py-2 rounded-lg bg-[#F5F5F0]">
                <option value="">-- Оберіть жанр --</option>
                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Обкладинка</label>
            <input type="file" accept="image/*" {...register('cover')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#2D332F] file:text-white file:cursor-pointer" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Анотація</label>
            <textarea {...register('description')} className="w-full px-4 py-2 rounded-lg bg-[#F5F5F0]" rows={3} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <input type="number" {...register('year')} placeholder="Рік" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
             <input type="number" {...register('pages')} placeholder="Сторінок" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
             <input type="text" {...register('format')} placeholder="Формат" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
             <input type="number" {...register('weight')} placeholder="Вага" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <input type="text" {...register('isbn')} placeholder="ISBN" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
             <input type="text" {...register('sku')} placeholder="SKU" className="px-3 py-2 bg-[#F5F5F0] rounded"/>
             <select {...register('coverType')} className="px-3 py-2 bg-[#F5F5F0] rounded">
                <option value="Тверда">Тверда</option>
                <option value="М'яка">М'яка</option>
             </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#2D332F] text-white py-4 rounded-xl font-bold mt-4 hover:bg-[#3A5A40] transition">
            {isSubmitting ? 'Збереження...' : 'Створити Книгу'}
          </button>
        </form>
      </div>
    </div>
  );
}