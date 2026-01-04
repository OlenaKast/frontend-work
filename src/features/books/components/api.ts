import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';

export type Book = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  description?: string;
  authorName: string;
  isAvailable: boolean;
  sku: string;
  year?: number;
  pages?: number;
  format?: string;
  isbn?: string;
};

const API_URL = 'http://localhost:4000';

const getFullImageUrl = (url: string | null) => {
  if (!url) return 'https://via.placeholder.com/300x450?text=No+Cover';
  if (url.startsWith('http')) return url;
  return `${API_URL}/${url}`;
};


const getBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get('/books');
  return response.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    
    imageUrl: getFullImageUrl(item.imageUrl), 
      
    rating: item.rating || 5.0,
    authorName: item.author 
      ? item.author.fullName || `${item.author.firstName} ${item.author.lastName}`
      : 'Невідомий автор',
    isAvailable: true,
    sku: item.sku
  }));
};

export const useBooks = () => {
  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });
};


const getBook = async (id: string): Promise<Book> => {
  const response = await apiClient.get(`/books/${id}`);
  const item = response.data;
  return {
    ...item,
    price: Number(item.price),
    
    imageUrl: getFullImageUrl(item.imageUrl),
      
    authorName: item.author ? item.author.fullName : 'Невідомий',
    rating: item.rating || 5.0,
    isAvailable: true
  };
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => getBook(id),
    enabled: !!id,
  });
};